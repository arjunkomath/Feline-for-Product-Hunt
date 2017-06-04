import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class Screen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'About'
    };

    render() {
        return (
            <View>
                <Text>About</Text>
            </View>
        );
    }
}

export default Screen