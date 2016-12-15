/**
* Navigation Drawer
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
var Share = require('react-native-share');
var Mixpanel = require('react-native-mixpanel');

const InAppBilling = require("react-native-billing");

var Drawer = React.createClass({

    getInitialState: function() {
        return {
            navigator: this.props.navigator,
            showDonate: false
        };
    },

    componentDidMount() {
        InAppBilling.open()
            .then(() => {
                InAppBilling.isSubscribed('buy_me_a_coffee').then(
                    (data) => {
                        console.log('Coffee? '+ data);
                        if(!data) {
                            this.setState({
                                showDonate: true
                            })
                        }
                        return InAppBilling.close()
                    })
                    .catch((err) => {
                        console.log(err);
                        return InAppBilling.close()
                    });
            });
    },

    _viewPosts: function(category) {
        this.state.navigator.resetTo({
            index: 0,
            category: category,
        });
    },

    _viewStarred: function() {
        this.state.navigator.resetTo({
            index: 6
        });
    },

    contact: function() {
        Mixpanel.track("Contact");
        IntentAndroid.openURL('mailto:arjunkomath@gmail.com');
    },

    share: function() {
        Mixpanel.track("Share Feline");
        Share.open({
            share_text: 'Feline for Product Hunt',
            share_URL: 'https://play.google.com/store/apps/details?id=com.arjunkomath.product_hunt',
            title: "Sharing is Caring"
        },function(e) {
            console.log(e);
        });
    },

    donate: function () {
        Mixpanel.track("Choose Donate");
        InAppBilling.open()
            .then(() => InAppBilling.subscribe('buy_me_a_coffee'))
            .then((details) => {
                console.log("You purchased: ", details)
                Mixpanel.track("Donate Success");
                return InAppBilling.close()
            })
            .catch((err) => {
                Mixpanel.track("Donate Failure");
                console.log(err);
                return InAppBilling.close()
            });
    },

    collections: function() {
        this.props.navigator.push({
            index: 5,
        });
    },

    render: function() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}
            style={styles.container}>

            <Image source={require('../Images/nav.jpg')} >
            <Image source={require('../Images/icon.png')} style={{width: 75, height: 75, marginLeft: 215, marginTop: 10}} />
            </Image>

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

            <Icon.Button name="star" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this._viewStarred()}>
            Starred Posts
            </Icon.Button>

            <Subheader text="COLLECTIONS" color="paperRed" />

            <Icon.Button name="star-o" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this.collections() }>
            Featured
            </Icon.Button>

            <Divider style={{marginTop: 10}} />

                { this.state.showDonate ? (
                    <Icon.Button name="coffee" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this.donate()}>
                    Buy me a coffee
                    </Icon.Button>
                    ) : (<Text></Text>)
                }

            <Icon.Button name="heart" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this.share()}>
            Share Feline
            </Icon.Button>

            <Divider style={{marginTop: 10}} />

            <Icon.Button name="bug" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => HockeyApp.feedback()}>
            Report Bug
            </Icon.Button>

            <Icon.Button name="user" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={() => this.contact()}>
            Contact
            </Icon.Button>

            <Text style={styles.version}>Version 1.4.1</Text>

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
