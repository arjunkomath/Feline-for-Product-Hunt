import React, {Component} from 'react';
import {observer} from 'mobx-react/native';
import {toJS} from 'mobx';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
import moment from 'moment';

import PostStore from '@store/posts';
import Post from '@component/post';

import {GREY_LIGHT, GREY_MED_LIGHT, GREY_DARK} from '@theme/light';

@observer
class Screen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Tech'
    };

    constructor(props) {
        super(props);
        this.category = 'tech';
    }

    componentDidMount() {
        PostStore.getPosts(this.category);
    }

    renderPost(post) {
        return <Post key={post.id} post={toJS(post)} navigation={this.props.navigation}/>
    }

    renderListItem(item) {
        let self = this;
        return (
            <View key={item.date}>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{moment(item.date).format('dddd, MMMM Do YYYY').toString().toUpperCase()}</Text>
                </View>
                {item.posts.map((post) => {
                    return self.renderPost(post);
                })}
            </View>
        );
    }

    renderFooter() {
        if(PostStore.isLoading) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={[styles.centering, {height: 40}]}
                    color="black"
                    size="small"
                />
            )
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    PostStore.getPosts(this.category);
                }}>
                    <View style={styles.loadMoreContainer}>
                        <Text style={styles.date}>LOAD MORE</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        let self = this;

        return (
            <ScrollView style={styles.container}>
                {PostStore.listItems[this.category].map((item) => {
                    return self.renderListItem(item);
                })}
                {self.renderFooter()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    date: {
        fontSize: 11,
        textAlign: 'center',
        padding: 5,
        marginLeft: 10
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    loadMoreContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    dateContainer: {
        backgroundColor: GREY_LIGHT
    },
    container: {
        borderTopWidth: 1,
        borderTopColor: GREY_MED_LIGHT,
        backgroundColor: '#ffffff'
    }
});

export default Screen