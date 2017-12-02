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
    Linking
} from "react-native";

import {NavigationActions} from 'react-navigation'
import ParsedText from 'react-native-parsed-text';
import {PH_ORANGE} from '@theme/light';
import User from '@component/user';
import theme from '@store/theme';

class ChildCommentsWidget extends Component {

    handleUrlPress(url) {
    }


    handleUrlPress(url) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'WebView',
            params: {
                url: url
            }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    handleEmailPress(email) {
        Linking.openURL('mailto:' + email);
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
                            <View style={[styles.container, {backgroundColor: theme.colors.MAIN_BG}]} key={comment.id}>
                                <User user={comment.user} navigation={this.props.navigation}/>
                                <View style={{flex: 1}}>
                                    <ParsedText
                                        style={[styles.body, {color: theme.colors.MAIN_TEXT}]}
                                        parse={
                                            [
                                                {type: 'url', style: [styles.url, {color: theme.colors.BUTTON_TEXT}], onPress: self.handleUrlPress.bind(self)},
                                                {type: 'email', style: [styles.url, {color: theme.colors.BUTTON_TEXT}], onPress: self.handleEmailPress.bind(self)},
                                            ]
                                        }
                                    >
                                        {comment.body}
                                    </ParsedText>
                                    <Text style={[styles.votes, {color: theme.colors.BUTTON_TEXT}]}>
                                        {comment.votes + " Vote(s) - Comment by " + comment.user.name}
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
        fontFamily: 'SFRegular'
    },
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
});

module.exports = ChildCommentsWidget;
