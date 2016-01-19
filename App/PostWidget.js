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

var Icon = require('react-native-vector-icons/FontAwesome')
import { Button } from 'react-native-material-design';
var ResponsiveImage = require('react-native-responsive-image');

import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window');

var PostWidget = React.createClass({

    getInitialState: function() {
        return {
            post: this.props.post,
            navigator: this.props.navigator
        };
    },

    _loadWebView: function(post) {
        this.state.navigator.push({
            index: 2,
            passProps: {url: this.state.post.redirect_url, title: this.state.post.name},
        });
    },

    render: function() {
        return (
            <View style={styles.row}>
            <ResponsiveImage source={{uri: this.state.post.thumbnail.image_url}} initWidth={width} initHeight="250" />

            <View style={
                {
                    height: 250,
                    width: width,
                    marginTop: -250,
                }
            }>
            <Image
            resizeMode={Image.resizeMode.strech}
            source={require('../Images/row_bag.png')}
            style={
                {
                    flex: 1,
                }
            }
            >
            <Text style={styles.headline}>{this.state.post.name}</Text>
            <Text style={styles.tagline}>{this.state.post.tagline}</Text>

            <View style={{flex: 1, flexDirection: 'row', marginTop: 7 }}>
            <View style={{
                width: 65,
                height: 10,
                marginLeft: 10,
            }}>
            <Icon.Button name="angle-up" color="#3e3e3e" backgroundColor="#ffffff" onPress={() => console.log('1')}>
            <Text style={{fontSize: 15}}>{this.state.post.votes_count}</Text>
            </Icon.Button>
            </View>
            <View style={{
                width: 90,
                height: 20,
                marginLeft: 10
            }}>
            <Icon.Button name="external-link" backgroundColor="#2196F3" onPress={() => this._loadWebView()}>
            <Text style={{fontSize: 15, color: '#ffffff'}}>GET IT</Text>
            </Icon.Button>
            </View>
            </View>

            </Image>
            </View>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    row: {
        flex: 1,
        height: 250,
        backgroundColor: '#3e3e3e'
    },
    headline: {
        fontSize: 20,
        marginTop: 150,
        color: '#ffffff',
        marginLeft: 15,
    },
    tagline: {
        fontSize: 14,
        color: '#ffffff',
        marginLeft: 15,
    },
});

module.exports = PostWidget;
