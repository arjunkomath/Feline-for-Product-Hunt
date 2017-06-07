'use strict';

import React, {Component} from "react";
import {
    StyleSheet,
    ScrollView,
    ListView,
    Text
} from 'react-native' ;

const Comment = require('./comment');

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
            <ScrollView style={{flex: 1}}>
                {this.state.comments.map((comment) => {
                    return (<Comment comment={comment} key={comment.id}/>)
                })}
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = DiscussionPage;
