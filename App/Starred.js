/**
* Starred Page
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

var PostWidget = require('./PostWidget');
var DrawerWidget = require('./DrawerWidget');
var Mixpanel = require('react-native-mixpanel');

import Store from 'react-native-store';
const DB = {
	'starred': Store.model('starred')
}

var Starred = React.createClass({

	getInitialState: function() {
		return {
			loaded: false,
			network: false,
			posts: [],
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
		};
	},

	componentDidMount: function() {
		this.fetchData();
		GoogleAnalytics.trackScreenView('Starred Page');
        Mixpanel.track("Starred Page");
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
		try {
			DB.starred.find().then( (resp) => {
				console.log(resp);
				if(resp) {
					this.setState({
						posts: resp,
						loaded: true,
						dataSource: this.state.dataSource.cloneWithRows(resp)
					});
				} else {
					this.setState({
						loaded: true
					});
				}
			});
		} catch(err) {
			console.log(err);
		}
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
				icon: 'refresh',
				onPress: () => {this.getPosts()}
			}]}
			overrides={{backgroundColor: '#3F51B5'}}
			/>

			<ListView
			dataSource={this.state.dataSource}
			renderRow={this.renderPosts}
			style={styles.listView}
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
			title={'Products'}
			icon='menu'
			onIconPress={() => { this.drawer.openDrawer() }}
			overrides={{backgroundColor: '#3F51B5'}}
			/>
			<View style={{flex: 1, marginTop: 52, paddingTop: 10, paddingBottom: 3, height: 20, backgroundColor: '#3F51B5'}}>
			<Text style={styles.empty}>NO STARRED POSTS</Text>
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

module.exports = Starred;
