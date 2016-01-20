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

var Drawer = React.createClass({

    getInitialState: function() {
        return {
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
            <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Image source={require('../Images/nav.jpg')} />
            <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Arjun!</Text>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = Drawer;
