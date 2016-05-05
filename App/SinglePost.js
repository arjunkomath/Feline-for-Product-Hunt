/**
* Product Page
*/
'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	ListView,
	BackAndroid,
	ToastAndroid
} = React;

var DiscussionPage = require('./Pages/DiscussionPage');
var MediaPage = require('./Pages/MediaPage');
var InfoPage = require('./Pages/InfoPage');

var ProgressBar = require('ProgressBarAndroid');
var Icon = require('react-native-vector-icons/FontAwesome')
import { Button } from 'react-native-material-design';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
const GoogleAnalytics = require('react-native-google-analytics-bridge');
var Share = require('react-native-share');

var ScrollableTabView = require('react-native-scrollable-tab-view');

import Store from 'react-native-store';
const DB = {
	'starred': Store.model('starred'),
	'theme': Store.model('theme')
}
var themes = require('./Themes/main');

var SinglePost = React.createClass({

	getInitialState: function() {
		return {
			loaded: false,
			network: true,
			access_token: this.props.token,
			post: this.props.post,
			starred: false
		};
	},

	navigatorPop(){
		this.props.navigator.pop();
		return true;
	},

	componentDidMount: function() {
		this.fetchData();
		this.getStarredPosts();
		BackAndroid.addEventListener('hardwareBackPress', this.navigatorPop);
		GoogleAnalytics.trackScreenView('Post Page');
		DB.theme.find().then( (resp) => {
			var theme = themes[resp[0].theme ? resp[0].theme : 'light'];
			this.setState({theme: theme});
		});
	},

	componentWillUnmount(){
		BackAndroid.removeEventListener('hardwareBackPress',this.navigatorPop)
	},

	getStarredPosts() {
		try {
			DB.starred.find({
				where: {
					and: [{ id: this.state.post.id }]
				}
			}).then( (resp) => {
				console.log(resp);
				if(resp)
					this.setState({starred: true}); 
				else
					this.setState({starred: false})
			});
		} catch(err) {
			console.log(err);
		}
	},

	fetchData: function() {
		var requestObj = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.state.access_token,
				'Host': 'api.producthunt.com'
			}
		};
		fetch('https://api.producthunt.com/v1/posts/'+this.state.post.id, requestObj)
		.then((response) => response.json())
		.then((responseData) => {
			// console.log(responseData);
			this.setState({
				comments: responseData.post.comments,
				media: responseData.post.media,
				post: responseData.post,
				loaded: true,
			});
		})
		.done(() => {});
	},

	share: function() {
		Share.open({
			share_text: this.state.post.name,
			share_URL: this.state.post.redirect_url,
			title: "Sharing is Caring"
		},function(e) {
			console.log(e);
		});
	},

	star: function() {
		try {
			if(this.state.starred) {
				DB.starred.remove({
					where: {
						and: [{ id: this.state.post.id }]
					}
				}).then(() => {
					this.setState({ starred: false });
					ToastAndroid.show('Post has been removed from starred', ToastAndroid.LONG);
				});
			} else {
				var save = this.state.post;
				delete save['_id'];
				DB.starred.add(save).then(() => {
					this.setState({ starred: true })
					ToastAndroid.show('Post has been starred', ToastAndroid.LONG);
				});
			}
		} catch(e) {
			console.log(e);
		}
	},

	renderToolbar: function() {
		if(this.state.starred) {
			return (
				<MaterialToolbar
				title={this.state.post.name}
				icon={'keyboard-backspace'}
				onIconPress={() => { this.props.navigator.pop()} }
				actions={[{
					icon: 'share',
					onPress: () => {this.share()}
				},{
					icon: 'star',
					onPress: () => {this.star()}
				}
				]}
				overrides={{backgroundColor: '#3F51B5'}}
				/>
				)
		} else {
			return (
				<MaterialToolbar
				title={this.state.post.name}
				icon={'keyboard-backspace'}
				onIconPress={() => { this.props.navigator.pop()} }
				actions={[{
					icon: 'share',
					onPress: () => {this.share()}
				},{
					icon: 'star-border',
					onPress: () => {this.star()}
				}
				]}
				overrides={{backgroundColor: '#3F51B5'}}
				/>
				)
		}
	},

	render: function() {
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}
		return (
			<View style={styles.container}>

			{this.renderToolbar()}

			<ScrollableTabView style={this.tabsStyle()}>
			<DiscussionPage tabLabel="Discussion" comments={this.state.comments} navigator={this.props.navigator}/>
			<MediaPage tabLabel="Media" media={this.state.media} />
			<InfoPage tabLabel="Info" post={this.state.post} navigator={this.props.navigator} />
			</ScrollableTabView>
			</View>
			);
	},

	renderLoadingView: function() {
		return (
			<View style={this.loadingStyle()}>
			<MaterialToolbar
			title={this.state.post.name}
			icon={'keyboard-backspace'}
			onIconPress={() => { this.props.navigator.pop()} }
			actions={[{
				icon: 'share',
				onPress: () => {this.share()}
			}]}
			overrides={{backgroundColor: '#3F51B5'}}
			/>
			<Image source={require('../Images/icon.png')} style={{height: 75, width: 75}}>
			<ProgressBar styleAttr="Large" color="#3F51B5" />
			</Image>
			</View>
			);
	},

	loadingStyle: function() {
		if(this.state.theme){
			return {
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: this.state.theme.background
			}
		} else return {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#ffffff',
		}
	},

	tabsStyle: function() {
		if(this.state.theme){
			return {
				flex: 1,
				marginTop: 58,
				backgroundColor: this.state.theme.background
			}
		} else return {
			flex: 1,
			marginTop: 58,
			backgroundColor: '#3e3e3e',
		}
	}

});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	}
});

module.exports = SinglePost;
