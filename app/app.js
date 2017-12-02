import React, { Component } from "react";
import { StackNavigator } from 'react-navigation';

import PostScreen from '@scene/postPage';
import WebScreen from '@scene/webScreen';
import { observer } from 'mobx-react/native';
import CategoryStore from '@store/category';

import {
    ActivityIndicator,
    StyleSheet,
    View,
    StatusBar
} from "react-native";

@observer
class App extends Component {

    componentWillMount() {
        let self = this;
        CategoryStore.navigation = this.props.navigation;
    }

    render() {
        if (!CategoryStore.isLoading) {
            return <CategoryStore.tabs />;
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: "#212121" }}>
                    <StatusBar
                        backgroundColor="#212121"
                        barStyle="light-content"
                    />
                    <ActivityIndicator
                        animating={true}
                        style={[styles.centering, { backgroundColor: "#212121" }]}
                        color="white"
                        size="large"
                    />
                </View>
            )
        }
    }

}

const Stack = StackNavigator({
    Home: {
        screen: ({ navigation }) => <App navigation={navigation} />
    },
    Post: {
        path: "post/:id",
        screen: PostScreen
    },
    WebView: {
        path: "view/:url",
        screen: WebScreen
    },
}, {
        navigationOptions: {
            header: null
        }
    });

const styles = StyleSheet.create({
    centering: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Stack;