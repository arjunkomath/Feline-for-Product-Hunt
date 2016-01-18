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
} = React;

var PostWidget = require('./PostWidget');
var UserWidget = require('./UserWidget');

var ProgressBar = require('ProgressBarAndroid');
var Icon = require('react-native-vector-icons/FontAwesome')
import { Button } from 'react-native-material-design';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';

var SinglePost = React.createClass({

    getInitialState: function() {
        return {
            loaded: false,
            network: true,
            access_token: undefined,
            post: this.props.post
        };
    },

    componentDidMount: function() {
        console.log(this.state.post);
        // this.fetchData();
    },

    fetchData: function() {
        var requestObj = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'api.producthunt.com'
            },
            body: JSON.stringify({
                "client_id": keys.key,
                "client_secret": keys.secret,
                "grant_type": 'client_credentials'
            })
        };
        fetch('https://api.producthunt.com/v1/oauth/token', requestObj)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.setState({
                access_token: responseData.access_token
            });
        })
        .done(() => {
            console.log('Got token!');
            this.getPosts();
        });
    },

    render: function() {
        return (
            <ScrollView
            automaticallyAdjustContentInsets={false}
            style={styles.scrollView}>

            <View style={styles.container}>
            <PostWidget post={this.state.post} />
            <UserWidget user={this.state.post.user} />
            </View>

            </ScrollView>
        );
    },

    renderLoadingView: function() {
        return (
            <View style={styles.loading}>
            <ProgressBar styleAttr="Inverse" />
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#e3e3e3',
    },
});

module.exports = SinglePost;
