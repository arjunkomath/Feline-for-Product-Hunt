/**
* Widget for Displaying User Details
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
} = React;

var UserWidget = React.createClass({

    getInitialState: function() {
        return {
            user: this.props.user,
            navigator: this.props.navigator
        };
    },

    _viewProfile: function() {
        this.state.navigator.push({
            index: 4,
            passProps: {user: this.state.user}
        });
    },

    render: function() {
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={() => this._viewProfile()}>
            <Image source={{uri: this.state.user.image_url['50px'] }} style={styles.thumbnail} />
            </TouchableOpacity>
            <View style={{flex: 1 }}>
            <Text style={styles.name}>{this.state.user.name}</Text>
            <Text style={styles.twitter}>@{this.state.user.twitter_username}</Text>
            </View>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3e3e3e',
        marginLeft: 20,
    },
    twitter: {
        fontSize: 14,
        color: '#3e3e3e',
        marginLeft: 20,
    },
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
});

module.exports = UserWidget;
