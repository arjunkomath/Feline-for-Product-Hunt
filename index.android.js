/**
* Sample React Native App
* https://github.com/facebook/react-native
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
} = React;

var PostsMain = require('./App/PostsMain');
var SinglePost = require('./App/SinglePost');
var ProductWebPage = require('./App/ProductWebPage');
var DatePicker = require('./App/DatePicker');
var ProfilePage = require('./App/Pages/ProfilePage');

var StatusBarAndroid = require('react-native-android-statusbar');
StatusBarAndroid.setHexColor('#AB1223');

var product_hunt = React.createClass({

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
                    />
                } else if(route.index == 4) {
                    return <ProfilePage
                    navigator={navigator}
                    user={route.passProps.user}
                    date={route.passProps.date}
                    />
                }
            }
        }
        />
    );
},

});

AppRegistry.registerComponent('product_hunt', () => product_hunt);
