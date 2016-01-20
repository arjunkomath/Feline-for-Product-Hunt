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
    Image,
} = React;

import { Subheader } from 'react-native-material-design';
var Icon = require('react-native-vector-icons/FontAwesome');

var Drawer = React.createClass({

    getInitialState: function() {
        return {
            navigator: this.props.navigator
        };
    },

    _viewPosts: function(category) {
        this.state.navigator.resetTo({
            index: 0,
            category: category,
        });
    },

    render: function() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Image source={require('../Images/nav.jpg')} />

            <Subheader text="CATEGORY" color="paperRed" />

            <Icon.Button name="laptop" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this._viewPosts('tech')}>
            Tech
            </Icon.Button>

            <Icon.Button name="gamepad" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this._viewPosts('games')}>
            Games
            </Icon.Button>

            <Icon.Button name="headphones" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this._viewPosts('podcasts')}>
            Podcasts
            </Icon.Button>

            <Icon.Button name="book" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this._viewPosts('books')}>
            Books
            </Icon.Button>

            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        height: 50,
        marginLeft: 10,
    }
});

module.exports = Drawer;
