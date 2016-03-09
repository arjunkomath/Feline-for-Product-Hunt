/**
* Feline for Product Hunt
* https://play.google.com/store/apps/details?id=com.arjunkomath.product_hunt
*/
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    BackAndroid,
    AsyncStorage
} = React;

var PostsMain = require('./App/PostsMain');
var CollectionsMain = require('./App/CollectionsMain');
var SinglePost = require('./App/SinglePost');
var ProductWebPage = require('./App/ProductWebPage');
var DatePicker = require('./App/DatePicker');
var ProfilePage = require('./App/Pages/ProfilePage');

var StatusBarAndroid = require('react-native-android-statusbar');
StatusBarAndroid.setHexColor('#303F9F');

import CodePush from "react-native-code-push";
var HockeyApp = require('react-native-hockeyapp');
var PushNotification = require('react-native-push-notification');
var keys = require('./Utils/keys.js');

PushNotification.configure({

    onRegister: async function(token) {
        var url = "http://d47f6ad0-e094-11e5-ab2c-c504a486d394.app.jexia.com";
        var gcm_id = await AsyncStorage.getItem('GCM_ID');
        if(!gcm_id || (gcm_id != token.token)) {
            AsyncStorage.setItem('GCM_ID', token.token);

            var requestObj = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key: keys.jexia_key,
                    secret: keys.jexia_secret
                })
            };
            fetch(url, requestObj)
            .then((response) => response.json())
            .catch((err) => {
                console.log(err);
            })
            .then((responseData) => {
                var requestObj = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + responseData.token
                    },
                    body: JSON.stringify({
                        token: token.token,
                        os: 'android'
                    })
                };
                fetch(url+'/gcm_subscribers', requestObj)
                .then((response) => response.json())
                .catch((err) => {
                    console.log(err);
                })
                .then((responseData) => {
                    console.log(responseData);
                });
            });

            console.log('Update Token');
        }
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: (optional) GCM Sender ID.
    senderID: "217633192466"

});

var product_hunt = React.createClass({

    componentWillMount() {
        HockeyApp.configure('1d4c277608044d458352f56171c4bdd5', true);
    },

    componentDidMount: function() {
        CodePush.sync();
        HockeyApp.start();
        HockeyApp.checkForUpdate();
    },

    render: function() {
        return (
            <Navigator
            initialRoute={{name: 'Posts', index: 0, pass_date: undefined, category: 'tech' }}
            renderScene={(route, navigator) => {

                if(route.index == 0) {
                    return <PostsMain
                    name={route.name}
                    navigator={navigator}
                    date={route.pass_date}
                    category={route.category}
                    />
                } else if(route.index == 1) {
                    return <SinglePost
                    navigator={navigator}
                    post={route.passProps.post}
                    token={route.passProps.token}
                    />
                } else if(route.index == 2) {
                    return <ProductWebPage
                    navigator={navigator}
                    url={route.passProps.url}
                    title={route.passProps.title}
                    />
                } else if(route.index == 3) {
                    return <DatePicker
                    navigator={navigator}
                    date={route.passProps.date}
                    category={route.passProps.category}
                    />
                } else if(route.index == 4) {
                    return <ProfilePage
                    navigator={navigator}
                    user={route.passProps.user}
                    date={route.passProps.date}
                    />
                } else if(route.index == 5) {
                    return <CollectionsMain
                    navigator={navigator}
                    />
                }
            }
        }
        />
        );
    },

});

AppRegistry.registerComponent('product_hunt', () => product_hunt);
