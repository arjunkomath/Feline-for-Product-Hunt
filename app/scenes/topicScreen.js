import React, {Component} from 'react';
import {observer} from 'mobx-react/native';
import {toJS} from 'mobx';
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import moment from 'moment';

import TopicStore from '@store/topic';
import Post from '@component/post';
import analytics from '@store/analytics';

import {GREY_LIGHT, GREY_MED_LIGHT, GREY_DARK} from '@theme/light';

/**
 * Listing page for posts in a category
 */
@observer
class Screen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topic: this.props.screenProps.topic,
            topicStore: null
        };
    }

    componentDidMount() {
        this.setState({
            topicStore: new TopicStore(this.state.topic)
        })
        analytics.logEvent("View Topic Page", {
            topic: this.state.topic
        });
    }

    renderFooter() {
        if (this.state.topicStore.isLoading) {
            return (
                <View style={styles.loadMoreContainer}>
                    <Text style={styles.loadMoreText}>...</Text>
                </View>
            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.state.topicStore.getPosts(this.state.category);
                }}>
                    <View style={styles.loadMoreContainer}>
                        <Text style={styles.loadMoreText}>View More</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    _onRefresh() {
        this.state.topicStore.reload(this.state.category);
    }

    render() {
        let self = this;
        if (!this.state.topic || !this.state.topicStore) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={[styles.centering, {height: 40}]}
                    color="black"
                    size="small"
                />
            )
        }
        return (
            <View
                style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.topicStore.isLoading}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }>
                    {this.state.topicStore.listItems.map((post) => {
                        return (<Post key={post.id} post={toJS(post)} navigation={this.props.navigation}/>)
                    })}
                    {/*{self.renderFooter()}*/}
                </ScrollView>
            </View>
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
    loadMoreText: {
        fontFamily: "SFBold",
        fontSize: 25,
        marginLeft: 10,
        color: '#1a1a1a'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    loadMoreContainer: {
        justifyContent: 'center',
        height: 50,
        marginTop: 10,
        marginBottom: 10,
    },
    dateContainer: {
        marginTop: 20,
        marginBottom: 10,
        height: 40
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3'
    }
});

export default Screen