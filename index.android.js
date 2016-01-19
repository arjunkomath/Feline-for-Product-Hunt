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
} = React;

var PostsMain = require('./App/PostsMain');
var SinglePost = require('./App/SinglePost');
var ProductWebPage = require('./App/ProductWebPage');
var DatePicker = require('./App/DatePicker');

var StatusBarAndroid = require('react-native-android-statusbar');
StatusBarAndroid.setHexColor('#AB1223');

var product_hunt = React.createClass({

    render: function() {
        return (
            <Navigator
            initialRoute={{name: 'Posts', index: 0, pass_date: undefined }}
            renderScene={(route, navigator) => {
                if(route.index == 0) {
                    return <PostsMain
                    name={route.name}
                    navigator={navigator}
                    date={route.pass_date}
                    onForward={() => {
                        var nextIndex = route.index + 1;
                        navigator.push({
                            name: 'Scene ' + nextIndex,
                            index: nextIndex,
                        });
                    }}
                    onBack={() => {
                        if (route.index > 0) {
                            navigator.pop();
                        }
                    }}
                    />
                } else if(route.index == 1) {
                    return <SinglePost
                    navigator={navigator}
                    post={route.passProps.post}
                    token={route.passProps.token}
                    onForward={() => {
                        var nextIndex = route.index + 1;
                        navigator.push({
                            name: 'Scene ' + nextIndex,
                            index: nextIndex,
                        });
                    }}
                    onBack={() => {
                        console.log('Back');
                        if (route.index > 0) {
                            navigator.pop();
                        }
                    }}
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
                }
            }
        }
        />
    );
},

});

AppRegistry.registerComponent('product_hunt', () => product_hunt);
