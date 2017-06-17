'use strict';

import React, {Component} from "react";
import {
    StyleSheet,
    ScrollView,
    View,
    Text
} from 'react-native' ;

const Comment = require('./comment');

/**
 * Discussions Area consisting of comments
 */
class DiscussionPage extends Component {

    constructor() {
        super();
        this.state = {
            comments: null
        };
    }

    componentDidMount() {
        this.setState({
            comments: this.props.comments
        })
    }

    render() {
        if (!this.state.comments) {
            return null;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Discussions</Text>
                <ScrollView>
                    {this.state.comments.map((comment) => {
                        return (<Comment comment={comment} key={comment.id} navigation={this.props.navigation}/>)
                    })}
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        margin: 15
    },
    title: {
        color: "#1a1a1a",
        fontSize: 25,
        fontFamily: "SFBold"
    }
});

module.exports = DiscussionPage;
