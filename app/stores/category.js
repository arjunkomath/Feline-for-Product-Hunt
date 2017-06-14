import React, {Component} from "react";
import {observable} from "mobx";
import {TabNavigator} from 'react-navigation';
import {
    AsyncStorage,
    ToastAndroid
} from "react-native";
import {API_KEY, API_SECRET, HOST} from "../constants";
import {
    ACTIVE_BACKGROUND_COLOR,
    INACTIVE_BACKGROUND_COLOR,
    ACTIVE_TINT_COLOR,
    INACTIVE_TINT_COLOR
} from '@theme/light';
import MainScreen from '@scene/mainScreen';
import TopicScreen from '@scene/topicScreen';
import AboutScreen from '@scene/about';
import ManageScreen from '@scene/settings';

const tabOptions = {
    scrollEnabled: true,
    // Had to edit tab navigator source to make it work :(
    lazy: true,
    activeBackgroundColor: ACTIVE_BACKGROUND_COLOR,
    inactiveBackgroundColor: INACTIVE_BACKGROUND_COLOR,
    inactiveTintColor: INACTIVE_TINT_COLOR,
    activeTintColor: ACTIVE_TINT_COLOR,
    labelStyle: {
        fontSize: 12,
        fontFamily: 'SFBold'
    },
    tabStyle: {
        width: 150,
        height: 40
    },
    style: {
        backgroundColor: ACTIVE_BACKGROUND_COLOR
    },
    indicatorStyle: {
        backgroundColor: ACTIVE_BACKGROUND_COLOR
    }
};

/**
 * Manage the Tab Navigation
 */
class Store {

    navigation = {};
    @observable isLoading = true;
    @observable categories = [];
    @observable topics = [];
    @observable trendingTopics = [];
    @observable tabs = {};

    /**
     * Get user preference, categories and topics
     */
    constructor() {
        let self = this;
        this.getTrendingTopics();
        AsyncStorage
            .getItem('categories')
            .then((categories) => {
                AsyncStorage
                    .getItem('topics')
                    .then((topics) => {
                        if (categories) {
                            self.categories = JSON.parse(categories);
                        } else {
                            self.categories = ['tech', 'games'];
                        }
                        if (topics) {
                            self.topics = JSON.parse(topics);
                        } else {
                            self.topics = [];
                        }
                        self.reload();
                    });
            });
    }

    /**
     * Update Category Prefs
     * @param categories
     */
    update(categories) {
        this.categories = categories;
    }

    /**
     * Update Topic Prefs
     * @param topics
     */
    updateTopics(topics) {
        this.topics = topics;
    }

    /**
     * Reload App
     */
    reload() {
        let self = this;
        const screens = {};
        self.categories.forEach((category, i) => {
            screens[this.categories[i]] = {
                screen: () => <MainScreen navigation={self.navigation} screenProps={{category: category}}/>
            };
        });
        self.topics.forEach((topic, i) => {
            screens[this.topics[i]] = {
                screen: () => <TopicScreen navigation={self.navigation} screenProps={{topic: topic}}/>
            };
        });
        screens['settings'] = {screen: ManageScreen};
        screens['about'] = {screen: AboutScreen};
        this.tabs = TabNavigator(screens, {tabBarOptions: tabOptions});
        AsyncStorage
            .setItem('categories', JSON.stringify(self.categories))
            .then(() => {
                AsyncStorage
                    .setItem('topics', JSON.stringify(self.topics))
                    .then(() => {
                        self.isLoading = false;
                    });
            });
    }

    /**
     * Reset user prefs
     */
    reset() {
        let self = this;
        this.isLoading = true;
        self.categories = ['tech', 'games', 'books'];
        self.topics = [];
        AsyncStorage
            .setItem('categories', JSON.stringify(self.categories))
            .then(() => {
                AsyncStorage
                    .setItem('topics', JSON.stringify(self.topics))
                    .then(() => {
                        self.reload();
                    })
            })
    }

    /**
     * Get Auth Token
     * @returns {*|Promise.<TResult>}
     */
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

    /**
     * Fetch list of trending topics
     */
    getTrendingTopics() {
        let self = this;
        this.isLoading = true;
        this
            .getAuthToken()
            .then(function () {
                var url = 'https://api.producthunt.com/v1/topics?search[trending]=true';
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
                        responseData.topics.forEach((topic) => {
                            if (['tech', 'games', 'books'].indexOf(topic.slug) > -1)
                                return true;
                            self.trendingTopics.push({
                                label: topic.name,
                                value: topic.slug
                            });
                        })
                    })
                    .catch((err) => {
                        if (err) {
                            ToastAndroid.show('Make sure your device is connected to the Internet', ToastAndroid.LONG);
                        }
                    });
            });
    }

}

export default store = new Store
