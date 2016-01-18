'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
} = React;

var Comment = require('../CommentWidget');

var DiscussionPage = React.createClass({

    getInitialState: function() {
        return {
            data: this.props.comments,
            comments: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    componentDidMount: function() {
        console.log(this.state.data);
        this.setState({
            comments: this.state.comments.cloneWithRows(this.state.data)
        });
    },

    render: function() {
        return (
            <ListView
            dataSource={this.state.comments}
            renderRow={this.renderPosts}
            style={styles.container}>
            </ListView>
        );
    },

    renderPosts: function(comment) {
        return (
            <View style={{flex:1}}>
            <Comment comment={comment} />
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = DiscussionPage;
