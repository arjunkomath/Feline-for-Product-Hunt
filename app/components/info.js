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

    _viewProfile(user) {
    }

    _translateCategory(id) {
        switch (id) {
            case 1:
                return 'Tech';
                break;
            case 2:
                return 'Games';
                break;
            case 3:
                return 'Podcasts';
                break;
            case 4:
                return 'Books';
                break;
            default:
                return 'Tech';
        }
    }

    render() {
        if (!this.state.post) {
            return (null);
        }

        let {post} = this.state;
        console.log(post);

        return (
            <ScrollView
                style={styles.container}>

                {/*<Text style={styles.head}>MAKERS</Text>*/}
                {/*<View style={styles.users}>*/}
                    {/*{post.makers.map((maker, i) =>*/}
                        {/*<TouchableOpacity key={i} onPress={() => this._viewProfile(maker)}>*/}
                            {/*<Image key={i} source={{uri: maker.image_url['50px']}} style={styles.thumbnail}/>*/}
                        {/*</TouchableOpacity>*/}
                    {/*) }*/}
                {/*</View>*/}

                {/*<Text style={styles.head}>UPVOTES</Text>*/}
                {/*<View style={styles.users}>*/}
                    {/*{this.renderVotes()}*/}
                {/*</View>*/}

                <Text style={styles.head}>CATEGORY</Text>
                <Text style={styles.tag}>{this._translateCategory(this.state.post.category_id)}</Text>

                <Text style={styles.head}>HUNTED BY</Text>
                {/*<UserWidget user={this.state.post.user}/>*/}

            </ScrollView>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        marginLeft: 10,
        color: '#000000'
    },
    tag: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        color: '#3e3e3e'
    },
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginLeft: 5
    },
    users: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 5
    }
});

module.exports = InfoPage;
