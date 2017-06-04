import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import {GREY, GREY_DARK, GREY_LIGHT} from '@theme/light';

class Post extends Component {
    render() {
        let {post} = this.props;
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: post.thumbnail.image_url}}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>{post.name}</Text>
                    <Text style={styles.tagline} ellipsizeMode="tail" numberOfLines={1}>{post.tagline}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.stats}>{post.votes_count + " UPVOTES, " + post.comments_count + " COMMENTS"}</Text>
                    </View>
                </View>
                <Image style={styles.makerImage} source={{uri: post.user.image_url['30px']}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: GREY
    },
    rowContainer: {
        flexDirection: 'row',
    },
    rightContainer: {
        paddingLeft: 10
    },
    image: {
        width: 75,
        height: 75
    },
    makerImage: {
        marginLeft: 10,
        width: 30,
        height: 30,
        borderRadius: 50
    },
    name: {
        fontSize: 18,
        fontFamily: 'Raleway-ExtraBold',
        width: 250
    },
    stats: {
        marginTop: 10,
        fontSize: 13,
        fontFamily: 'Raleway-Medium'
    },
    tagline: {
        marginTop: 5,
        fontSize: 13,
        fontFamily: 'Raleway-Medium',
        width: 250
    },
    votesButton: {
        width: 75
    }
});

export default Post;