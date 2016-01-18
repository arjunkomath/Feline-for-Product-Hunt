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
    ListView,
    Image,
    ToolbarAndroid,
    TouchableHighlight,
} = React;

var ProgressBar = require('ProgressBarAndroid');
var keys = require('./../Utils/keys.js');
var Icon = require('react-native-vector-icons/FontAwesome')
import { Toolbar as MaterialToolbar } from 'react-native-material-design';

var PostWidget = require('./PostWidget');

var PostsMain = React.createClass({

    getInitialState: function() {
        return {
            loaded: false,
            network: true,
            access_token: undefined,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    componentDidMount: function() {
        this.fetchData();
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

    getPosts: function() {
        var daysAgo = daysAgo || 0;
        var requestObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.access_token,
                'Host': 'api.producthunt.com'
            }
        };
        fetch('https://api.producthunt.com/v1/posts?days_ago=' + daysAgo, requestObj)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
                loaded: true,
            });
        })
        .done();
    },

    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.container}>

            <MaterialToolbar
            title={navigator && navigator.currentRoute ? navigator.currentRoute.title : 'Products'}
            icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
            onIconPress={() => navigator && navigator.isChild ? navigator.back() : () => {}}
            overrides={{backgroundColor: '#F4511E'}}
            />

            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPosts}
            style={styles.listView}
            />

            </View>
        );
    },

    renderLoadingView: function() {
        return (
            <View style={styles.loading}>
            <ProgressBar styleAttr="Inverse" />
            </View>
        );
    },

    _loadPost: function(post) {
        this.props.navigator.push({
            index: 1,
            passProps: {post: post, token: this.state.access_token},
        });
    },

    renderPosts: function(post) {
        return (
            <TouchableHighlight onPress={() => {this._loadPost(post)}}>
            <View style={{flex:1}}>
            <PostWidget post={post} />
            </View>
            </TouchableHighlight>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listView: {
        backgroundColor: '#ffffff',
        marginTop: 56
    }
});

module.exports = PostsMain;
