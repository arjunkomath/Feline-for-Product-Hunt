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
    DrawerLayoutAndroid,
} = React;

var ProgressBar = require('ProgressBarAndroid');
var keys = require('./../Utils/keys.js');
import { Toolbar as MaterialToolbar } from 'react-native-material-design';

var PostWidget = require('./PostWidget');
var DrawerWidget = require('./DrawerWidget');

var PostsMain = React.createClass({

    getInitialState: function() {
        return {
            loaded: false,
            network: true,
            access_token: undefined,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            pass_date: this.props.date,
            category: this.props.category ? this.props.category : 'tech'
        };
    },

    componentDidMount: function() {
        this.fetchData();
        console.log(this.state);
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
                access_token: responseData.access_token,
                network: true
            });
        })
        .catch((err) => {
            this.setState({
                network: false
            });
        })
        .done(() => {
            console.log('Got token!');
            this.getPosts();
        });
    },

    getPosts: function() {
        if(this.state.pass_date) {
            var today = new Date(this.state.pass_date);
        } else var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var day = yyyy+'-'+mm+'-'+dd;
        var pass_day = yyyy+'/'+mm+'/'+dd;
        this.setState({ date_text: today.toDateString(), date: pass_day });
        var requestObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.access_token,
                'Host': 'api.producthunt.com'
            }
        };
        fetch('https://api.producthunt.com/v1/categories/'+this.state.category+'/posts?day=' + day, requestObj)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            if(responseData.posts) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
                    loaded: true,
                    network: true
                });
            } else {
                this.setState({
                    loaded: true,
                    network: true
                });
                console.log('no data');
            }
        })
        .catch((err) => {
            this.setState({
                network: false
            });
        })
        .done();
    },

    _pickDate: function() {
        this.props.navigator.push({
            index: 3,
            passProps: {date: this.state.date}
        });
    },

    _renderHeader: function() {
        return (
            <View style={{flex: 1, paddingTop: 3, paddingBottom: 3}}>
            <Text style={styles.date}>{this.state.date_text}</Text>
            </View>
        )
    },

    render: function() {

        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        if(!this.state.network) {
            return this.renderNetworkError();
        }

        var navigationView = <DrawerWidget navigator={this.props.navigator} />;

        return (
            <View style={styles.container}>

            <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}
            ref={(ref) => this.drawer = ref }>

            <MaterialToolbar
            title={navigator && navigator.currentRoute ? navigator.currentRoute.title : 'Products'}
            icon='menu'
            onIconPress={() => { this.drawer.openDrawer() }}
            actions={[{
                icon: 'date-range',
                onPress: () => {this._pickDate()}
            },{
                icon: 'search',
                onPress: () => {this._pickDate()}
            }]}
            overrides={{backgroundColor: '#F4511E'}}
            />

            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderPosts}
            style={styles.listView}
            renderHeader={this._renderHeader}
            />

            </DrawerLayoutAndroid>

            </View>
        );
    },

    renderLoadingView: function() {
        return (
            <View style={styles.loading}>
            <ProgressBar styleAttr="Inverse" color="red" />
            </View>
        );
    },

    renderNetworkError: function() {
        return (
            <View style={styles.loading}>
            <Text>Unable to Connect to Server! :(</Text>
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
            <PostWidget post={post} navigator={this.props.navigator} />
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
    },
    date: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3e3e3e'
    },
});

module.exports = PostsMain;
