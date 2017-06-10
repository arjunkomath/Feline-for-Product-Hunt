/**
 * Comments Reply Widget
 */
'use strict';

import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    IntentAndroid
} from "react-native";

import ParsedText from 'react-native-parsed-text';
import {PH_ORANGE} from '@theme/light';

class ChildCommentsWidget extends Component {

    handleUrlPress(url) {
    }

    handleEmailPress(email) {
        IntentAndroid.openURL('mailto:' + email);
    }

    render() {
        let self = this;
        if (!this.props.hasOwnProperty('comments') && this.props.comments.length == 0) {
            return null;
        }
        return (
            <View>
                {
                    this.props.comments.map((comment) => {
                        return (
                            <View style={styles.container} key={comment.id}>
                                <Image source={{uri: comment.user.image_url['50px']}} style={styles.thumbnail}/>
                                <View style={{flex: 1}}>
                                    <ParsedText
                                        style={styles.body}
                                        parse={
                                            [
                                                {
                                                    type: 'url',
                                                    style: styles.url,
                                                    onPress: self.handleUrlPress.bind(self)
                                                },
                                                {
                                                    type: 'email',
                                                    style: styles.url,
                                                    onPress: self.handleEmailPress.bind(self)
                                                },
                                            ]
                                        }
                                    >
                                        {comment.body}
                                    </ParsedText>
                                    <Text style={styles.votes}>
                                        {comment.votes + "-" + comment.user.name}
                                    </Text>
                                </View>
                            </View>
                        );
                    })
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 50,
    },
    url: {
        fontSize: 14,
        fontWeight: 'bold',
        color: PH_ORANGE,
        marginLeft: 20,
        textDecorationLine: 'underline',
    },
    body: {
        fontSize: 14,
        color: '#3e3e3e',
        marginLeft: 20,
        fontFamily: 'SFRegular'
    },
    votes: {
        fontSize: 10,
        color: '#3e3e3e',
        marginLeft: 20,
    },
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
});

module.exports = ChildCommentsWidget;
