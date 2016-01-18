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
var StatusBarAndroid = require('react-native-android-statusbar');
StatusBarAndroid.setHexColor('#AB1223');

var product_hunt = React.createClass({

    render: function() {
        return (
            <Navigator
            initialRoute={{name: 'Posts', index: 0 }}
            renderScene={(route, navigator) => {
                if(route.index == 0) {
                    return <PostsMain
                    name={route.name}
                    navigator={navigator}
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
                }
            }
        }
        />
    );
},

});

AppRegistry.registerComponent('product_hunt', () => product_hunt);
