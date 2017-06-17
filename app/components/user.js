import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {NavigationActions} from 'react-navigation'

/**
 * User Widget
 */
class User extends Component {

    constructor() {
        super();
    }

    openUser(user) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'WebView',
            params: {
                url: user.profile_url
            }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        let {user} = this.props;
        return (
            <TouchableOpacity onPress={() => {
                this.openUser(user);
            }}>
                <View style={styles.container}>
                    <Image style={styles.makerImage} source={{uri: user.image_url['50px']}}/>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    makerImage: {
        width: 35,
        height: 35,
        borderRadius: 50
    }
});

export default User;