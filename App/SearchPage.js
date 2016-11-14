/**
 * Search Page
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ListView,
    View,
    TextInput
} = React;

const GoogleAnalytics = require('react-native-google-analytics-bridge');
import Icon from 'react-native-vector-icons/FontAwesome';
var algoliasearch = require('algoliasearch/reactnative')('0H4SMABBSG', '9670d2d619b9d07859448d7628eea5f3');
var AlgoliaSearchHelper = require('algoliasearch-helper');

var PostWidget = require('./PostWidget');
var keys = require('./../Utils/keys.js');

var Fabric = require('react-native-fabric');
var { Answers } = Fabric;


var Starred = React.createClass({

    getInitialState: function () {
        return {
            loaded: false,
            network: false,
            posts: [],
            keyword: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    componentWillMount: function () {
        var helper = this.helper = AlgoliaSearchHelper(algoliasearch, 'Post_production');
        helper.on('result', (res) => {
            this.setState({
                posts: res.hits,
                searching: false,
                dataSource: this.state.dataSource.cloneWithRows(res.hits)
            });
        });
    },

    componentDidMount: function () {
        this.fetchData();
        GoogleAnalytics.trackScreenView('Search Page');
    },

    fetchData: function () {
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
                this.setState({
                    access_token: responseData.access_token,
                    network: true
                });
            })
            .catch((err) => {
                console.log(err);
                ToastAndroid.show('Please check your Internet connection', ToastAndroid.LONG);
                this.setState({
                    network: false,
                    loaded: true
                });
            })
            .done(() => {
                console.log('Got token!');
            });
    },

    getPosts: function () {
        this.setState({
            posts: [],
            searching: true
        });
        Answers.logSearch(this.state.keyword);
        this.helper.setQuery(this.state.keyword).search();
    },

    goBack: function () {
        this.props.navigator.pop()
    },

    render: function () {

        if (!this.state.posts.length)
            return this.renderStart();

        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <TouchableWithoutFeedback onPress={this.goBack}>
                        <Icon
                            name="arrow-circle-left"
                            size={30} color="white"
                            style={{marginLeft: 15, marginTop: 15}}
                        />
                    </TouchableWithoutFeedback>
                    <TextInput
                        style={styles.searchBar}
                        onChangeText={(keyword) => {this.setState({keyword: keyword})}}
                        onSubmitEditing={this.getPosts}
                        autoFocus={true}
                        placeholder="Search..."
                        placeholderTextColor="#FF80AB"
                        underlineColorAndroid="#FF80AB"
                        value={this.state.text}
                    />
                </View>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderPosts}
                    style={styles.listView}
                />

            </View>
        );
    },

    _loadPost: function (post) {
        this.props.navigator.push({
            index: 1,
            passProps: {post: post, token: this.state.access_token},
        });
    },

    renderStart: function () {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <TouchableWithoutFeedback onPress={this.goBack}>
                        <Icon
                            name="arrow-circle-left"
                            size={30} color="white"
                            style={{marginLeft: 15, marginTop: 15}}
                        />
                    </TouchableWithoutFeedback>
                    <TextInput
                        style={styles.searchBar}
                        onChangeText={(keyword) => {this.setState({keyword: keyword})}}
                        onSubmitEditing={() => {
                        this.getPosts();
                        }}
                        blurOnSubmit={false}
                        autoFocus={true}
                        placeholder="Search..."
                        placeholderTextColor="#FF80AB"
                        underlineColorAndroid="#FF80AB"
                        value={this.state.text}
                    />
                </View>

                <View style={styles.loading}>
                    <Text style={{color: 'white', fontSize: 18}}>
                        {this.state.searching ? 'Searching...' : this.state.posts.length + ' Posts found!'}
                    </Text>
                </View>

            </View>

        );
    },

    renderPosts: function (post, sId, id) {
        return (
            <TouchableHighlight onPress={() => {this._loadPost(post)}}>
                <View style={{flex:1}}>
                    <PostWidget post={post} navigator={this.props.navigator} delay={ id*25 }/>
                </View>
            </TouchableHighlight>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F51B5',
    },
    toolbar: {
        height: 56,
        backgroundColor: '#3F51B5',
        flexDirection: 'row',
        elevation: 5
    },
    listView: {
        backgroundColor: '#ffffff'
    },
    searchBar: {
        height: 50,
        width: 300,
        marginLeft: 15,
        borderColor: 'white',
        color: 'white',
        borderWidth: 1
    }
});

module.exports = Starred;
