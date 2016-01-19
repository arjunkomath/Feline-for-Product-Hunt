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
} = React;

var HEADER = '#3b5998';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://m.facebook.com';

var ProgressBar = require('ProgressBarAndroid');

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

    componentDidMount: function() {
        console.log(this.state);
        BackAndroid.addEventListener('hardwareBackPress', () => {this.props.navigator.pop(); return true;} )
    },

    render: function() {
        return (
            <View style={styles.container}>
            <Text style={styles.status}>{this.state.title}</Text>
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
            renderLoading={() => (<View style={styles.loading}><ProgressBar styleAttr="Inverse" color="red" /></View>) }
            />
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
        height: 400
    },
});

module.exports = ProductWebPage;
