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
var StatusBarAndroid = require('react-native-android-statusbar');
StatusBarAndroid.setHexColor('#AB1223');

var product_hunt = React.createClass({

    render: function() {
        return (
            <Navigator
            initialRoute={{name: 'Posts', index: 0}}
            renderScene={(route, navigator) =>
                <PostsMain
                name={route.name}
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
            }
            />
        );
    },

});

AppRegistry.registerComponent('product_hunt', () => product_hunt);
