import {observable} from "mobx";
import moment from "moment";
import {API_KEY, API_SECRET, HOST} from "../constants";
import {
    AsyncStorage,
    NetInfo,
    ToastAndroid,
    Alert
} from "react-native";

class Store {

    access_token = null;
    @observable listItems = [];
    @observable isLoading = true;

    constructor(topic) {
        this.topic = topic;
        this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
        NetInfo.fetch().then((reach) => {
            console.log('Initial: ' + reach);
            if (reach == "NONE") {
                Alert.alert(
                    'No Internet Connection',
                    'Make sure your device is connected to the Internet'
                );

                NetInfo.addEventListener(
                    'change',
                    this.handleFirstConnectivityChange
                );
            } else {
                this.getPosts(topic);
            }
        });
    }

    getAuthToken() {
        return AsyncStorage
            .getItem('access_token')
            .then((access_token) => {
                if (access_token) {
                    this.access_token = access_token;
                    return new Promise.resolve();
                } else {
                    var requestObj = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Host': HOST
                        },
                        body: JSON.stringify({
                            "client_id": API_KEY,
                            "client_secret": API_SECRET,
                            "grant_type": 'client_credentials'
                        })
                    };
                    return fetch('https://api.producthunt.com/v1/oauth/token', requestObj)
                        .then((response) => response.json())
                        .then((responseData) => {
                            this.access_token = responseData.access_token;
                            try {
                                AsyncStorage.setItem('access_token', responseData.access_token);
                            } catch (error) {
                                console.log(error);
                            }
                            return new Promise.resolve();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
    }

    getPosts(topic) {
        this.isLoading = true;
        console.log("Loading", topic);
        let self = this;
        this
            .getAuthToken()
            .then(function () {
                var url = 'https://api.producthunt.com/v1/posts/all?search[topic]=' + topic;
                var requestObj = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + self.access_token,
                        'Host': HOST
                    }
                };

                fetch(url, requestObj)
                    .then((response) => response.json())
                    .then((responseData) => {
                        // if (!responseData.posts.length) {
                        //     self.getPosts(category);
                        // } else {
                        self.isLoading = false;
                        self.listItems = responseData.posts;
                        // }
                    })
                    .catch((err) => {
                        if (err) {
                            ToastAndroid.show('Make sure your device is connected to the Internet', ToastAndroid.LONG);
                        }
                    });
            });
    }

    reload(topic) {
        this.getPosts(topic);
    }

    handleFirstConnectivityChange(reach) {
        console.log('First change: ' + reach);
        let self = this;
        if (reach != "NONE") {
            self.reload(self.category);
        }
        NetInfo.removeEventListener(
            'change',
            this.handleFirstConnectivityChange
        );
    }

}

export default Store
