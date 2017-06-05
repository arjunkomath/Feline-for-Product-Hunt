import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class Screen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Post'
    };

    render() {
        return (
            <View>
                <Text>Post Page</Text>
            </View>
        );
    }
}

export default Screen