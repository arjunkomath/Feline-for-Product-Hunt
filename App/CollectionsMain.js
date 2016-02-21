/**
* Collections Main Page
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
var Icon = require('react-native-vector-icons/FontAwesome');
const GoogleAnalytics = require('react-native-google-analytics-bridge');

var CollectionWidget = require('./CollectionWidget');
var DrawerWidget = require('./DrawerWidget');

var Collections = React.createClass({

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
        GoogleAnalytics.trackScreenView(' Collections Page');
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
        var url = 'https://api.producthunt.com/v1/collections?search[featured]=true&per_page=25';

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
            console.log(responseData.collections);
            this.setState({ collections: responseData.collections });
            if(responseData.collections.length > 0) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.collections),
                    older: responseData.collections[24].id,
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
            this.setState({
                network: false
            });
        })
        .done();
    },

    getMorePosts: function() {
        var older = this.state.older;
        console.log('Load older than '+older);
        var url = 'https://api.producthunt.com/v1/collections?search[featured]=true&per_page=25&older='+older;

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
            console.log(responseData.collections);
            this.setState({ collections: responseData.collections });
            if(responseData.collections.length > 0) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.collections),
                    older: responseData.collections[24].id,
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
            this.setState({
                network: false
            });
        })
        .done();
    },

    _renderHeader: function() {
        return (
            <View style={{flex: 1, paddingTop: 3, paddingBottom: 3, backgroundColor: '#3F51B5'}}>
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

        if(!this.state.collections.length) {
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
            title={'Featured Collections'}
            icon='menu'
            onIconPress={() => { this.drawer.openDrawer() }}
            overrides={{backgroundColor: '#3F51B5'}}
            />

            <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderCollections}
            style={styles.listView}
            renderHeader={this._renderHeader}
            onEndReached={this.getMorePosts}
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

    renderNetworkError: function() {
        return (
            <View style={styles.loading}>
            <Icon name="exclamation-circle" size={50} color="#000000" />
            <Text>Unable to Connect to Server</Text>
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
            title={'Featured Collections'}
            icon='menu'
            onIconPress={() => { this.drawer.openDrawer() }}
            overrides={{backgroundColor: '#3F51B5'}}
            />
            <View style={{flex: 1, marginTop: 52, paddingTop: 10, paddingBottom: 3, height: 20, backgroundColor: '#3F51B5'}}>
            <Text style={styles.empty}>NO POSTS</Text>
            </View>
            </DrawerLayoutAndroid>
            </View>
        );
    },

    renderCollections: function(collection) {
        return (
            <View style={{flex:1}}>
            <CollectionWidget collection={collection} navigator={this.props.navigator} />
            </View>
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
        backgroundColor: '#3F51B5',
    },
    listView: {
        backgroundColor: '#ffffff',
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

module.exports = Collections;
