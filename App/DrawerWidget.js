/**
 * Navigation Drawer
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    IntentAndroid,
    AsyncStorage,
    Linking
} = React;

import {Subheader} from 'react-native-material-design';
var Icon = require('react-native-vector-icons/FontAwesome');
import {Divider} from 'react-native-material-design';
var HockeyApp = require('react-native-hockeyapp');
var Share = require('react-native-share');

const InAppBilling = require("react-native-billing");
var keys = require('./../Utils/keys.js');

var Drawer = React.createClass({

    getInitialState: function () {
        return {
            navigator: this.props.navigator,
            showDonate: false,
            loggedIn: false
        };
    },

    componentDidMount() {
        InAppBilling.open()
            .then(() => {
                InAppBilling.isSubscribed('buy_me_a_coffee').then(
                    (data) => {
                        console.log('Coffee? ' + data);
                        if (!data) {
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
        AsyncStorage.getItem('access_code', (err, code) => {
            if(err) console.log(err);
            if(code)
                this.setState({
                    loggedIn: true
                })
        })
    },

    _viewPosts: function (category) {
        this.state.navigator.resetTo({
            index: 0,
            category: category,
        });
    },

    _viewStarred: function () {
        this.state.navigator.resetTo({
            index: 6
        });
    },

    contact: function () {
        IntentAndroid.openURL('mailto:arjunkomath@gmail.com');
    },

    share: function () {
        Share.open({
            share_text: 'Feline for Product Hunt',
            share_URL: 'https://play.google.com/store/apps/details?id=com.arjunkomath.product_hunt',
            title: "Sharing is Caring"
        }, function (e) {
            console.log(e);
        });
    },

    donate: function () {
        InAppBilling.open()
            .then(() => InAppBilling.subscribe('buy_me_a_coffee'))
            .then((details) => {
                console.log("You purchased: ", details)
                return InAppBilling.close()
            })
            .catch((err) => {
                console.log(err);
                return InAppBilling.close()
            });
    },

    collections: function () {
        this.props.navigator.push({
            index: 5,
        });
    },

    login: function () {
        console.log('Initiate login');
        var login_url = 'https://api.producthunt.com/v1/oauth/authorize?client_id='+keys.key+'&redirect_uri='+keys.redirect_uri+'&response_type=code&scope=public+private';
        Linking.openURL(login_url).catch(err => console.error('An error occurred', err));
    },

    logout: function () {
        AsyncStorage.removeItem('access_code', () => {
            AsyncStorage.removeItem('access_token', () => {
                this._viewPosts('tech');
            })
        })
    },

    render: function () {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={styles.container}>

                    <Image source={require('../Images/nav.jpg')}>
                        <Image source={require('../Images/icon.png')}
                               style={{width: 75, height: 75, marginLeft: 215, marginTop: 10}}/>
                    </Image>

                    { this.state.loggedIn ?
                        (
                            <Icon.Button name="sign-in" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={this.logout}>
                                Logout
                            </Icon.Button>
                        ) :
                        (
                            <Icon.Button name="sign-out" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons} onPress={this.login}>
                                Login
                            </Icon.Button>
                        )
                    }

                    <Subheader text="CATEGORY" color="paperRed"/>

                    <Icon.Button name="laptop" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                 onPress={() => this._viewPosts('tech')}>
                        Tech
                    </Icon.Button>

                    <Icon.Button name="gamepad" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                 onPress={() => this._viewPosts('games')}>
                        Games
                    </Icon.Button>

                    <Icon.Button name="headphones" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                 onPress={() => this._viewPosts('podcasts')}>
                        Podcasts
                    </Icon.Button>

                    <Icon.Button name="book" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                 onPress={() => this._viewPosts('books')}>
                        Books
                    </Icon.Button>

                    <Icon.Button name="star" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                 onPress={() => this._viewStarred()}>
                        Starred Posts
                    </Icon.Button>

                    <Subheader text="COLLECTIONS" color="paperRed"/>

                    <Icon.Button name="star-o" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                 onPress={() => this.collections() }>
                        Featured
                    </Icon.Button>

                    <Divider style={{marginTop: 10}}/>

                    { this.state.showDonate ? (
                        <Icon.Button name="coffee" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                     onPress={() => this.donate()}>
                            Buy me a coffee
                        </Icon.Button>
                    ) : (<Text></Text>)
                    }

                    <Icon.Button name="heart" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                 onPress={() => this.share()}>
                        Share Feline
                    </Icon.Button>

                    <Divider style={{marginTop: 10}}/>

                    <Icon.Button name="bug" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                 onPress={() => HockeyApp.feedback()}>
                        Report Bug
                    </Icon.Button>

                    <Icon.Button name="user" backgroundColor="#ffffff" color="#3e3e3e" style={styles.buttons}
                                 onPress={() => this.contact()}>
                        Contact
                    </Icon.Button>

                    <Text style={styles.version}>Version 1.2.1</Text>

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
