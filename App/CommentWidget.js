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
} = React;

var ChildComments = require('./ChildCommentsWidget');

var CommentWidget = React.createClass({

    getInitialState: function() {
        return {
            comment: this.props.comment
        };
    },

    render: function() {
        return (
            <View style={{flex: 1}}>
            <View style={styles.container}>

            <Image source={{uri: this.state.comment.user.image_url['50px'] }} style={styles.thumbnail} />

            <View style={{flex: 1 }}>
            <Text style={styles.body}>{this.state.comment.body}</Text>
            <Text style={styles.votes}>{this.state.comment.votes} Vote(s) | {this.state.comment.user.name}</Text>
            </View>

            </View>
            <ChildComments comment={this.state.comment.child_comments} />
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
