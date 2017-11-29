'use strict';

import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";

var Icon = require('react-native-vector-icons/FontAwesome');
var UserWidget = require('./user');
import theme from '@store/theme';

/**
 * Post Info Section
 */
class InfoPage extends Component {

    constructor() {
        super();
        this.state = {
            post: null
        };
    }

    componentDidMount() {
        this.setState({
            post: this.props.post
        })
    }

    renderVotes() {
        if (!this.state.post.votes.length) {
            return (null);
        }

        var limit = 6;
        if (this.state.post.votes.length < 6)
            limit = this.state.post.votes.length;

        var rows = [];
        for (var i = 0; i < limit; i++) {
            rows.push(
                <Image key={i} source={{uri: this.state.post.votes[i].user.image_url['50px']}} style={styles.thumbnail}/>)
        }
        rows.push(<Icon key={6} style={{marginLeft: 15, marginTop: 10}} name="ellipsis-h" size={30} color="#000000"/>);
        return rows;
    }

    render() {
        if (!this.state.post) {
            return (null);
        }

        let {post} = this.state;

        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.container}>
                {this.state.post.topics.map(function (topic) {
                    return (
                        <View key={topic.name} style={[styles.box, {backgroundColor: theme.colors.SECONDARY_BG}]}>
                            <Text style={[styles.tag, {color: theme.colors.MAIN_TEXT}]}>{topic.name}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    box: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        borderColor: '#e3e3e3'
    },
    tag: {
        fontFamily: "SFRegular",
        color: '#3e3e3e'
    },
});

module.exports = InfoPage;
