import React, {Component} from 'react';
import {observer} from 'mobx-react/native';
import {
    ScrollView,
    StyleSheet,
    View,
    Text
} from 'react-native';
import moment from 'moment';

import TechStore from '@store/tech';
import Post from '@component/post';

import {GREY_LIGHT, GREY_MED_LIGHT, GREY_DARK} from '@theme/light';

@observer
class Screen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Tech'
    };

    constructor(props) {
        super(props);
        TechStore.getPosts();
    }

    renderPost(post) {
        return <Post key={post.id} post={post}/>
    }

    renderListItem(item) {
        let self = this;
        return (
            <ScrollView key={item.date}>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{moment(item.date).format('dddd, MMMM Do YYYY').toString()}</Text>
                </View>
                {item.posts.map((post) => {
                    return self.renderPost(post);
                })}
            </ScrollView>
        );
    }

    render() {
        let self = this;
        return (
            <View style={styles.container}>
                {TechStore.listItems.map((item) => {
                    return self.renderListItem(item);
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    date: {
        fontSize: 15,
        padding: 5,
        marginLeft: 10,
        fontFamily: 'Raleway-Medium',
        color: GREY_DARK
    },
    dateContainer: {
        backgroundColor: GREY_MED_LIGHT
    },
    container: {
        backgroundColor: GREY_LIGHT
    }
});

export default Screen