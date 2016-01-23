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
    Image,
    TouchableOpacity,
    BackAndroid,
    IntentAndroid,
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
import ParsedText from 'react-native-parsed-text';
var ChildComments = require('./ChildCommentsWidget');

var CommentWidget = React.createClass({

    getInitialState: function() {
        return {
            comment: this.props.comment,
            navigator: this.props.navigator
        };
    },

    _viewProfile: function(user) {
        this.state.navigator.push({
            index: 4,
            passProps: {user: user}
        });
    },

    handleUrlPress: function(url) {
        this.state.navigator.push({
            index: 2,
            passProps: {url: url, title: url},
        });
    },

    handleEmailPress: function(email) {
        IntentAndroid.openURL('mailto:'+email);
    },

    render: function() {
        return (
            <View style={{flex: 1}}>
            <View style={styles.container}>

            <TouchableOpacity onPress={() => this._viewProfile(this.state.comment.user)}>
            <Image source={{uri: this.state.comment.user.image_url['50px'] }} style={styles.thumbnail} />
            </TouchableOpacity>

            <View style={{flex: 1 }}>

            <ParsedText
            style={styles.body}
            parse={
                [
                    {type: 'url', style: styles.url, onPress: this.handleUrlPress},
                    {type: 'email', style: styles.url, onPress: this.handleEmailPress},
                ]
            }
            >
            {this.state.comment.body}
            </ParsedText>

            <Text style={styles.votes}><Icon name="chevron-up" size={10} color="#000000" /> {this.state.comment.votes} - {this.state.comment.user.name}</Text>
            </View>

            </View>
            <ChildComments comment={this.state.comment.child_comments} navigator={this.state.navigator} />
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    body: {
        fontSize: 14,
        color: '#3e3e3e',
        marginLeft: 20,
    },
    url: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3F51B5',
        marginLeft: 20,
        textDecorationLine: 'underline',
    },
    votes: {
        fontSize: 10,
        color: '#3e3e3e',
        marginLeft: 20,
    },
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
});

module.exports = CommentWidget;
