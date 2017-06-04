import {observable} from "mobx";
import moment from "moment";
import {API_KEY, API_SECRET, HOST} from "../constants";

class Store {

    access_token = '';
    @observable listItems = []
    @observable isLoading = false;

    getAuthToken() {
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
                console.log(responseData);
                this.access_token = responseData.access_token;
                return;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getPosts() {
        let date = moment().format('YYYY-MM-DD').toString();
        let self = this;
        this
            .getAuthToken()
            .then(function () {
                console.log('Got token!');
                this.isLoading = true;
                var url = 'https://api.producthunt.com/v1/categories/tech/posts?day=' + date;
                var requestObj = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + self.access_token,
                        'Host': HOST
                    }
                };

                console.log(requestObj);
                fetch(url, requestObj)
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData);
                        self.listItems.push({
                            date: date,
                            posts: responseData.posts
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
    }

}

export default store = new Store
