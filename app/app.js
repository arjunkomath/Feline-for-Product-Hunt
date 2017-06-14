import React, {Component} from "react";
import {StackNavigator} from 'react-navigation';

import PostScreen from '@scene/postPage';
import WebScreen from '@scene/webScreen';
import {observer} from 'mobx-react/native';
import CategoryStore from '@store/category';

import {
    ActivityIndicator,
    StyleSheet
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
                <ActivityIndicator
                    animating={true}
                    style={[styles.centering]}
                    color="black"
                    size="large"
                />
            )
        }
    }

}

const Stack = StackNavigator({
    Home: {
        screen: ({navigation}) => <App navigation={navigation}/>
    },
    Post: {
        path: 'post/:id',
        screen: PostScreen
    },
    WebView: {
        path: 'view/:url',
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
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Stack;