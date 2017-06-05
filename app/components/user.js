import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {NavigationActions} from 'react-navigation'

class User extends Component {

    constructor() {
        super();
    }

    openUser(user) {
        console.log(user.id);
    }

    render() {
        let {user} = this.props;
        return (
            <TouchableOpacity onPress={() => {
                this.openUser(user)
            }}>
                <View style={styles.container}>
                    <Image style={styles.makerImage} source={{uri: user.image_url['30px']}}/>
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