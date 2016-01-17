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
} = React;

var keys = require('./../Utils/keys.js');
var { Icon, } = require('react-native-icons');
const { mdl, } = require('react-native-material-kit');
var ResponsiveImage = require('react-native-responsive-image');

import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window');

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

            <ToolbarAndroid
            title="Product Hunt"
            style={styles.toolbar}
            titleColor="#ffffff" />

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
            <mdl.Spinner/>
            <Text>
            Loading posts...
            </Text>
            </View>
        );
    },

    renderPosts: function(post) {
        return (
            <View style={styles.row}>
            <ResponsiveImage source={{uri: post.thumbnail.image_url}} initWidth={width} initHeight="250" />
            <View style={
                {
                    height: 250,
                    width: width,
                    marginTop: -250,
                }
            }>
            <Image
            resizeMode={Image.resizeMode.strech}
            source={require('../Images/row_bag.png')}
            style={
                {
                    flex: 1
                }
            }
            >
            <Text style={styles.headline}>{post.name}</Text>
            <Text style={styles.tagline}>{post.tagline}</Text>
            </Image>
            </View>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: '#bdbdbd'
    },
    headline: {
        fontSize: 24,
        marginTop: 175,
        color: '#ffffff',
        marginLeft: 15,
    },
    tagline: {
        fontSize: 14,
        color: '#ffffff',
        marginLeft: 15,
    },
    loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listView: {
        backgroundColor: '#ffffff',
    },
    toolbar: {
        backgroundColor: '#F4511E',
        height: 56,
    },
});

module.exports = PostsMain;
