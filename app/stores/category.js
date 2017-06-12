import React, {Component} from "react";
import {observable} from "mobx";
import {TabNavigator} from 'react-navigation';
import {
    AsyncStorage
} from "react-native";

import {
    ACTIVE_BACKGROUND_COLOR,
    INACTIVE_BACKGROUND_COLOR,
    ACTIVE_TINT_COLOR,
    INACTIVE_TINT_COLOR
} from '@theme/light';
import MainScreen from '@scene/mainScreen';
import AboutScreen from '@scene/about';
import ManageScreen from '@scene/settings';

const tabOptions = {
    scrollEnabled: true,
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
        width: 120,
        height: 40
    },
    style: {
        backgroundColor: ACTIVE_BACKGROUND_COLOR
    },
    indicatorStyle: {
        backgroundColor: ACTIVE_TINT_COLOR
    }
};

class Store {

    navigation = {};
    @observable isLoading = true;
    @observable categories = [];
    @observable tabs = {};

    constructor() {
        let self = this;
        const screens = {};

        AsyncStorage
            .getItem('categories')
            .then((categories) => {
                if (categories) {
                    self.categories = JSON.parse(categories);
                } else {
                    self.categories = ['tech', 'games'];
                }
                self.categories.forEach((category, i) => {
                    screens[self.categories[i]] = {
                        screen: () => <MainScreen navigation={self.navigation} screenProps={{category: category}}/>
                    };
                });
                screens['settings'] = {screen: ManageScreen};
                screens['about'] = {screen: AboutScreen};
                self.tabs = TabNavigator(screens, {tabBarOptions: tabOptions});
                self.isLoading = false;
            });
    }

    update(categories) {
        let self = this;
        this.isLoading = true;
        this.categories = categories;
        const screens = {};
        this.categories.forEach((category, i) => {
            screens[this.categories[i]] = {
                screen: () => <MainScreen screenProps={{category: category}}/>
            };
        });
        screens['settings'] = {screen: ManageScreen};
        screens['about'] = {screen: AboutScreen};
        this.tabs = TabNavigator(screens, {tabBarOptions: tabOptions});
        AsyncStorage
            .setItem('categories', JSON.stringify(categories))
            .then(() => {
                self.isLoading = false;
            })
    }

}

export default store = new Store
