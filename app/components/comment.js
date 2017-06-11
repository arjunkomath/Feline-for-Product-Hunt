/**
 * Main Comments Widget
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
var ChildComments = require('./childComment');
import User from '@component/user';
import {PH_ORANGE} from '@theme/light';

class CommentWidget extends Component {

    constructor() {
        super();
        this.state = {
            comment: null
        };
    }

    componentDidMount() {
        this.setState({
            comment: this.props.comment
        });
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
        if (!this.state.comment) {
            return (
                <View></View>
            )
        }

        let self = this;
        let {comment} = this.state;

        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <User user={comment.user} navigation={this.props.navigation}/>
                    <View style={{flex: 1}}>
                        <ParsedText
                            style={styles.body}
                            parse={
                                [
                                    {type: 'url', style: styles.url, onPress: self.handleUrlPress.bind(self)},
                                    {type: 'email', style: styles.url, onPress: self.handleEmailPress.bind(self)},
                                ]
                            }
                        >
                            {comment.body}
                        </ParsedText>

                        <Text style={styles.votes}>
                            {comment.votes + ' Vote(s) - Comment by ' + comment.user.name}
                        </Text>
                    </View>
                </View>
                { (comment.child_comments.length) ?
                    <ChildComments comments={comment.child_comments} navigation={this.props.navigation}/> : null }
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    body: {
        fontSize: 14,
        color: '#3e3e3e',
        marginLeft: 20,
        fontFamily: 'SFRegular'
    },
    url: {
        fontSize: 14,
        fontWeight: 'bold',
        color: PH_ORANGE,
        marginLeft: 20,
        textDecorationLine: 'underline',
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

module.exports = CommentWidget;
