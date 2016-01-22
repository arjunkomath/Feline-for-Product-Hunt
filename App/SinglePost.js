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

var SinglePost = React.createClass({

    getInitialState: function() {
        return {
            loaded: false,
            network: true,
            access_token: this.props.token,
            post: this.props.post
        };
    },

    navigatorPop(){
        this.props.navigator.pop();
        return true;
    },

    componentDidMount: function() {
        this.fetchData();
        BackAndroid.addEventListener('hardwareBackPress', this.navigatorPop);
        GoogleAnalytics.trackScreenView('Post Page');
    },

    componentWillUnmount(){
        BackAndroid.removeEventListener('hardwareBackPress',this.navigatorPop)
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
            console.log(responseData);
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

    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={styles.container}>

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

            <ScrollableTabView style={styles.tabs}>
            <DiscussionPage tabLabel="Discussion" comments={this.state.comments} navigator={this.props.navigator}/>
            <MediaPage tabLabel="Media" media={this.state.media} />
            <InfoPage tabLabel="Info" post={this.state.post} navigator={this.props.navigator} />
            </ScrollableTabView>
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

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',

    },
    tabs: {
        flex: 1,
        marginTop: 58,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

module.exports = SinglePost;
