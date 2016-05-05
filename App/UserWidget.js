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

import Store from 'react-native-store';
const DB = {
    'theme': Store.model('theme')
}

var themes = require('./Themes/main');

var UserWidget = React.createClass({

    getInitialState: function() {
        return {
            user: this.props.user,
            navigator: this.props.navigator
        };
    },

    componentDidMount: function() {
        DB.theme.find().then( (resp) => {
            var theme = themes[resp[0].theme ? resp[0].theme : 'light'];
            this.setState({theme: theme});
        });
    },

    _viewProfile: function() {
        this.state.navigator.push({
            index: 4,
            passProps: {user: this.state.user}
        });
    },

    mainBag: function() {
        if(this.state.theme){
            return {
                flex: 1,
                flexDirection: 'row',
                backgroundColor: this.state.theme.childBackground,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10
            }
        } else return {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#F5F5F5',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
        }
    },

    nameStyle: function() {
        if(this.state.theme){
            return {
                fontSize: 15,
                fontWeight: 'bold',
                color: this.state.theme.foreground,
                marginLeft: 20,
            }
        } else return {
            fontSize: 15,
            fontWeight: 'bold',
            color: '#3e3e3e',
            marginLeft: 20,
        }
    },

    twitterStyle: function() {
        if(this.state.theme){
            return {
                fontSize: 14,
                color: this.state.theme.foreground,
                marginLeft: 20,
            }
        } else return {
            fontSize: 14,
            color: '#3e3e3e',
            marginLeft: 20,
        }
    },

    render: function() {
        return (
            <View style={this.mainBag()}>
            <TouchableOpacity onPress={() => this._viewProfile()}>
            <Image source={{uri: this.state.user.image_url['50px'] }} style={styles.thumbnail} />
            </TouchableOpacity>
            <View style={{flex: 1 }}>
            <Text style={this.nameStyle()}>{this.state.user.name}</Text>
            <Text style={this.twitterStyle()}>@{this.state.user.twitter_username}</Text>
            </View>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
});

module.exports = UserWidget;
