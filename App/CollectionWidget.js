/**
* Post Widget for Populating the ListView
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

import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window');
var _height = height/2.7;

var CollectionWidget = React.createClass({

    getInitialState: function() {
        return {
            collection: this.props.collection,
            navigator: this.props.navigator
        };
    },

    _loadWebView: function(post) {
        this.state.navigator.push({
            index: 2,
            passProps: {url: this.state.collection.collection_url, title: this.state.collection.name},
        });
    },

    render: function() {
        return (
            <View style={styles.row}>
            <Image source={{uri: this.state.collection.background_image_url}} resizeMode={Image.resizeMode.cover} style={{width: width, height: _height}}>

            <View style={
                {
                    height: _height,
                    width: width,
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
            <Text style={styles.headline}>{this.state.collection.name}</Text>
            <Text style={styles.tagline}>{this.state.collection.title}</Text>

            <View style={{flex: 1, flexDirection: 'row', marginTop: 7 }}>
            <View style={{
                width: 75,
                height: 10,
                marginLeft: 10,
            }}>
            <Icon.Button name="user" color="#3e3e3e" backgroundColor="#ffffff" onPress={() => console.log('1')}>
            <Text style={{fontSize: 15}}>{this.state.collection.subscriber_count}</Text>
            </Icon.Button>
            </View>
            <View style={{
                width: 90,
                height: 20,
                marginLeft: 10
            }}>
            <Icon.Button name="external-link" backgroundColor="#3F51B5" onPress={() => this._loadWebView()}>
            <Text style={{fontSize: 15, color: '#ffffff'}}>GET IT</Text>
            </Icon.Button>
            </View>
            </View>

            </Image>
            </View>
            </Image>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    row: {
        flex: 1,
        height: _height,
        backgroundColor: '#3e3e3e'
    },
    headline: {
        fontSize: 17,
        marginTop: height/5,
        color: '#ffffff',
        marginLeft: 15,
    },
    tagline: {
        fontSize: 12,
        color: '#ffffff',
        marginLeft: 15,
    },
});

module.exports = CollectionWidget;
