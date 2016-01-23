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
    WebView,
    BackAndroid,
    IntentAndroid,
} = React;

var HEADER = '#3b5998';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://m.facebook.com';

var ProgressBar = require('ProgressBarAndroid');
const GoogleAnalytics = require('react-native-google-analytics-bridge');
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
var Share = require('react-native-share');

var ProductWebPage = React.createClass({

    getInitialState: function() {
        return {
            url: this.props.url,
            title: this.props.title,
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    },

    navigatorPop(){
        this.props.navigator.pop();
        return true;
    },

    componentDidMount: function() {
        BackAndroid.addEventListener('hardwareBackPress', this.navigatorPop);
        GoogleAnalytics.trackScreenView('WebView');
    },

    componentWillUnmount(){
        BackAndroid.removeEventListener('hardwareBackPress',this.navigatorPop)
    },

    share: function() {
        Share.open({
            share_text: this.state.title,
            share_URL: this.state.url,
            title: "Sharing is Caring"
        },function(e) {
            console.log(e);
        });
    },

    render: function() {
        return (
            <View style={styles.container}>

            <MaterialToolbar
            title={this.state.title}
            icon={'keyboard-backspace'}
            onIconPress={() => { this.props.navigator.pop(); return true; } }
            actions={[{
                icon: 'share',
                onPress: () => {this.share()}
            },{
                icon: 'open-in-browser',
                onPress: () => {IntentAndroid.openURL(this.state.url)}
            }]}
            overrides={{backgroundColor: '#3F51B5'}}
            />

            <WebView
            ref={WEBVIEW_REF}
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            url={this.state.url}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onNavigationStateChange={this.onNavigationStateChange}
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
            startInLoadingState={true}
            scalesPageToFit={this.state.scalesPageToFit}
            renderLoading={() => this.renderLoadingView() }
            />
            </View>
        );
    },

    renderLoadingView: function() {
        return (
            <View style={styles.loading}>
            <Image source={require('../Images/icon.png')} style={{height: 75, width: 75}}>
            <ProgressBar styleAttr="Large" color="#3F51B5" />
            </Image>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    status: {
        fontSize: 12,
        textAlign: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    webView: {
        flex: 1,
        backgroundColor: '#3e3e3e',
        height: 400,
        marginTop: 56,
    },
});

module.exports = ProductWebPage;
