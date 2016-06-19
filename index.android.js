/**
* Feline for Product Hunt
* https://play.google.com/store/apps/details?id=com.arjunkomath.product_hunt
*/
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Navigator,
    Linking,
    ToastAndroid,
    AsyncStorage
} = React;

var PostsMain = require('./App/PostsMain');
var CollectionsMain = require('./App/CollectionsMain');
var SinglePost = require('./App/SinglePost');
var ProductWebPage = require('./App/ProductWebPage');
var DatePicker = require('./App/DatePicker');
var ProfilePage = require('./App/Pages/ProfilePage');
var Starred = require('./App/Starred');
var SearchPage = require('./App/SearchPage');

var StatusBarAndroid = require('react-native-android-statusbar');
StatusBarAndroid.setHexColor('#303F9F');

import CodePush from "react-native-code-push";
var HockeyApp = require('react-native-hockeyapp');
var keys = require('./Utils/keys.js');

var product_hunt = React.createClass({

    componentWillMount() {
        HockeyApp.configure('1d4c277608044d458352f56171c4bdd5', true);
    },

    componentDidMount: function() {
        // CodePush.sync();
        HockeyApp.start();
        HockeyApp.checkForUpdate();
        var url = Linking.getInitialURL().then((url) => {
            if (url) {
                var parts = url.split('?');
                if(parts[1]) {
                    var code = parts[1].split('=')[1];
                    AsyncStorage.setItem('access_code', code, () => {
                        ToastAndroid.show('You have logged in!', ToastAndroid.SHORT);
                    })
                }
            }
        }).catch(err => console.error('An error occurred', err));
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
                } else if(route.index == 6) {
                    return <Starred
                    navigator={navigator}
                    />
                } else if(route.index == 7) {
                    return <SearchPage
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
