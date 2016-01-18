'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
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

            <Text style={styles.head}>MAKERS</Text>
            <View style={styles.users}>
            {this.state.post.makers.map( (maker, i) => <Image key={i} source={{uri: maker.image_url['50px'] }} style={styles.thumbnail} /> ) }
            </View>

            <Text style={styles.head}>UPVOTES</Text>
            <View style={styles.users}>
            {this.state.post.votes.map( (vote, i) => <Image key={i} source={{uri: vote.user.image_url['50px'] }} style={styles.thumbnail} /> ) }
            </View>

            <Text style={styles.head}>PLATFORMS</Text>
            <View style={styles.users}>
            {this.state.post.platforms.map( (platform, i) => <Text key={i} style={styles.tag}>{platform.name}</Text> ) }
            </View>

            <Text style={styles.head}>CATEGORY</Text>
            <Text style={styles.tag}>{this.state.post.category_id}</Text>

            <Text style={styles.head}>HUNTED BY</Text>
            <UserWidget user={this.state.post.user} />

            </ScrollView>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        marginLeft: 10,
        color: '#000000'
    },
    tag: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        color: '#3e3e3e'
    },
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginLeft: 5
    },
    users: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 5
    }
});

module.exports = InfoPage;
