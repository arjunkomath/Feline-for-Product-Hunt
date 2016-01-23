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
    ScrollView,
    IntentAndroid,
} = React;

import { Subheader } from 'react-native-material-design';
var Icon = require('react-native-vector-icons/FontAwesome');
import { Divider } from 'react-native-material-design';
var HockeyApp = require('react-native-hockeyapp');

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

    contact: function() {
        IntentAndroid.openURL('mailto:arjunkomath@gmail.com');
    },

    render: function() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Image source={require('../Images/nav.jpg')} >
            <Image source={require('../Images/icon.png')} style={{width: 75, height: 75, marginLeft: 215, marginTop: 10}} />
            </Image>

            <ScrollView
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}
            style={styles.container}>

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

            <Divider style={{marginTop: 10}} />

            <Icon.Button name="bug" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => HockeyApp.feedback()}>
            Report Bug
            </Icon.Button>

            <Icon.Button name="user" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this.contact()}>
            Contact
            </Icon.Button>

            <Text style={styles.version}>Version 1.0.0</Text>

            </ScrollView>

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
    },
    version: {
        height: 50,
        marginLeft: 20,
        marginTop: 15
    },
});

module.exports = Drawer;
