/**
* Home Page / Posts Page
*/
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ToolbarAndroid,
    TouchableHighlight,
    DrawerLayoutAndroid,
    ToastAndroid
} = React;

var ProgressBar = require('ProgressBarAndroid');
var keys = require('./../Utils/keys.js');
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
var Icon = require('react-native-vector-icons/FontAwesome');
import { Divider } from 'react-native-material-design';
const GoogleAnalytics = require('react-native-google-analytics-bridge');

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
        GoogleAnalytics.trackScreenView(this.state.category.toUpperCase() + ' Products Page');
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
            // console.log(responseData);
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
            this.getPosts();
        });
    },

    getPosts: function() {
        if(this.state.pass_date) {
            var today = new Date(this.state.pass_date);
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var day = yyyy+'-'+mm+'-'+dd;
            var pass_day = yyyy+'/'+mm+'/'+dd;

            this.setState({ date_text: today.toDateString(), date: pass_day });

            var url = 'https://api.producthunt.com/v1/categories/'+this.state.category+'/posts?day=' + day;
        } else {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var day = yyyy+'-'+mm+'-'+dd;
            var pass_day = yyyy+'/'+mm+'/'+dd;

            this.setState({ date_text: 'TODAY', date: pass_day });

            var url = 'https://api.producthunt.com/v1/categories/'+this.state.category+'/posts?days_ago=0';
        }

        var requestObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.access_token,
                'Host': 'api.producthunt.com'
            }
        };
        fetch(url, requestObj)
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData.posts);
            this.setState({ posts: responseData.posts });
            if(responseData.posts.length > 0) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.posts),
                    loaded: true,
                    network: true,
                });
            } else {
                this.setState({
                    loaded: true,
                    network: true,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            ToastAndroid.show('Please check your Internet connection', ToastAndroid.LONG);
            this.setState({
                network: false,
                loaded: true
            });
        })
        .done();
    },

    _pickDate: function() {
        this.props.navigator.push({
            index: 3,
            passProps: {date: this.state.date, category: this.state.category}
        });
    },

    _startSearch: function() {
        this.props.navigator.push({
            index: 7,
            passProps: { category: this.state.category}
        });
    },

    _renderHeader: function() {
        return (
            <View style={{flex: 1, paddingTop: 3, paddingBottom: 3, backgroundColor: '#3F51B5'}}>
            <Text style={styles.date}>{this.state.category.toUpperCase()} - {this.state.date_text}</Text>
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

        if(!this.state.posts.length) {
            return this.renderNoPosts();
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
            title={'Products'}
            icon='menu'
            onIconPress={() => { this.drawer.openDrawer() }}
            actions={[{
                icon: 'date-range',
                onPress: () => {this._pickDate()}
            },
            {
                icon: 'search',
                onPress: () => {this._startSearch()}
            }]}
            overrides={{backgroundColor: '#3F51B5'}}
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
            <Image source={require('../Images/icon.png')} style={{height: 75, width: 75}}>
            <ProgressBar styleAttr="Large" color="#3F51B5" />
            </Image>
            </View>
        );
    },

    renderNetworkError: function () {
        return (
            <View style={styles.loading}>
                <Icon name="exclamation-circle" size={50} color="#ffffff"/>
                <Text style={{color: '#ffffff'}}>Unable to Connect to Server</Text>
                <Divider style={{marginTop: 10}}/>
                <Icon.Button name="refresh" backgroundColor="#ffffff" color="#3e3e3e"
                             onPress={() => this.getPosts()}>
                   Retry
                </Icon.Button>
            </View>
        );
    },

    renderNoPosts: function() {
        var navigationView = <DrawerWidget navigator={this.props.navigator} />;
        return (
            <View style={styles.container}>
            <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}
            ref={(ref) => this.drawer = ref }>
            <MaterialToolbar
            title={'Products'}
            icon='menu'
            onIconPress={() => { this.drawer.openDrawer() }}
            actions={[{
                icon: 'date-range',
                onPress: () => {this._pickDate()}
            }]}
            overrides={{backgroundColor: '#3F51B5'}}
            />
            <View style={{flex: 1, marginTop: 52, paddingTop: 10, paddingBottom: 3, height: 20, backgroundColor: '#3F51B5'}}>
            <Text style={styles.date}>{this.state.category.toUpperCase()} - {this.state.date_text}</Text>
            <Text style={styles.empty}>NO POSTS</Text>
            </View>
            </DrawerLayoutAndroid>
            </View>
        );
    },

    _loadPost: function(post) {
        this.props.navigator.push({
            index: 1,
            passProps: {post: post, token: this.state.access_token},
        });
    },

    renderPosts: function(post, sId, id) {
        return (
            <TouchableHighlight onPress={() => {this._loadPost(post)}}>
            <View style={{flex:1}}>
            <PostWidget post={post} navigator={this.props.navigator} delay={id * 25} />
            </View>
            </TouchableHighlight>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3F51B5',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F51B5',
    },
    listView: {
        backgroundColor: '#3F51B5',
        marginTop: 56
    },
    date: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FF80AB'
    },
    empty: {
        fontSize: 20,
        marginTop: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FF80AB'
    },
});

module.exports = PostsMain;
