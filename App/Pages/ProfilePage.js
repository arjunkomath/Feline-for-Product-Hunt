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
    BackAndroid,
} = React;

var ResponsiveImage = require('react-native-responsive-image');
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
var Icon = require('react-native-vector-icons/FontAwesome')

var ProfilePage = React.createClass({

    getInitialState: function() {
        return {
            user: this.props.user,
            navigator: this.props.navigator
        };
    },

    navigatorPop(){
        this.props.navigator.pop();
        return true;
    },

    componentDidMount: function() {
        BackAndroid.addEventListener('hardwareBackPress', this.navigatorPop);
    },

    componentWillUnmount(){
        BackAndroid.removeEventListener('hardwareBackPress',this.navigatorPop)
    },

    _loadWebView: function(url) {
        this.state.navigator.push({
            index: 2,
            passProps: {url: url, title: this.state.user.name},
        });
    },

    render: function() {
        return (
            <View style={styles.container}>
            <MaterialToolbar
            title={this.state.user.name}
            icon={'keyboard-backspace'}
            onIconPress={() => { this.props.navigator.pop()} }
            overrides={{backgroundColor: '#3F51B5'}}
            />
            <ResponsiveImage style={styles.image} source={{uri: this.state.user.image_url['264px']}} initWidth="264" initHeight="264" />
            <Text style={styles.name}>{this.state.user.name}</Text>

            {(() => {
                if(this.state.user.profile_url)
                return (<Icon.Button name="user" color="#3e3e3e" backgroundColor="#ffffff" onPress={() => this._loadWebView(this.state.user.profile_url)}>
                <Text style={{fontSize: 15}}>VIEW PROFILE</Text>
                </Icon.Button>)
            })()}

            {(() => {
                if(this.state.user.website_url)
            <Icon.Button name="external-link" color="#3e3e3e" backgroundColor="#ffffff" onPress={() => this._loadWebView(this.state.user.website_url)}>
            <Text style={{fontSize: 15}}>{this.state.user.website_url}</Text>
            </Icon.Button>
            })()}

            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3e3e3e',
        marginBottom: 20,
    },
    image: {
        borderRadius: 130,
        marginBottom: 15
    }
});

module.exports = ProfilePage;
