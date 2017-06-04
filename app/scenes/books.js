import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class Screen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Books'
    };

    render() {
        return (
            <View>
                <Text>Books</Text>
            </View>
        );
    }
}

export default Screen