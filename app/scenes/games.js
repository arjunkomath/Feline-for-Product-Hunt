import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class Screen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Games'
    };

    render() {
        return (
            <View>
                <Text>Games</Text>
            </View>
        );
    }
}

export default Screen