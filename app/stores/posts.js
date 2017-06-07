import {observable} from "mobx";
import moment from "moment";
import {API_KEY, API_SECRET, HOST} from "../constants";
import {
    AsyncStorage
} from "react-native";

class Store {

    access_token = null;
    @observable listItems = {
        tech: [],
        games: [],
        books: []
    };
    @observable isLoading = false;

    getAuthToken() {
        if (this.access_token) {
            return new Promise.resolve();
        }
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
                return;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getPosts(category) {
        this.isLoading = true;
        let date = moment().format('YYYY-MM-DD').toString();
        if (this.listItems[category].length) {
            date = moment(this.listItems[category][this.listItems[category].length - 1].date).add(-1, 'days').format('YYYY-MM-DD').toString();
        }
        let self = this;
        this
            .getAuthToken()
            .then(function () {
                var url = 'https://api.producthunt.com/v1/categories/' + category + '/posts?day=' + date;
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
                        self.listItems[category].push({
                            date: date,
                            posts: responseData.posts
                        });
                        if (!responseData.posts.length) {
                            self.getPosts(category);
                        } else {
                            self.isLoading = false;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
    }

}

export default store = new Store
