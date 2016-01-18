'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
} = React;

var DiscussionPage = require('./Pages/DiscussionPage');
var MediaPage = require('./Pages/MediaPage');
var InfoPage = require('./Pages/InfoPage');

var ProgressBar = require('ProgressBarAndroid');
var Icon = require('react-native-vector-icons/FontAwesome')
import { Button } from 'react-native-material-design';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';

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

    componentDidMount: function() {
        this.fetchData();
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
                loaded: true,
            });
        })
        .done(() => {});
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
            overrides={{backgroundColor: '#F4511E'}}
            />

            <ScrollableTabView style={styles.tabs}>
            <DiscussionPage tabLabel="Discussion" comments={this.state.comments} />
            <MediaPage tabLabel="Media" media={this.state.media} />
            <InfoPage tabLabel="Info" post={this.state.post} />
            </ScrollableTabView>
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

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
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
