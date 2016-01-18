'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
} = React;

var UserWidget = require('../UserWidget');

var InfoPage = React.createClass({

    getInitialState: function() {
        return {
            post: this.props.post
        };
    },

    render: function() {
        return (
            <ScrollView
            style={styles.container}>
            <UserWidget user={this.state.post.user} />
            </ScrollView>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = InfoPage;
