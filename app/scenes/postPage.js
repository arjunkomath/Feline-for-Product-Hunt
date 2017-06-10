import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
import {HOST} from "../constants";
let {height, width} = Dimensions.get('window');

import {GREY, GREY_DARK, GREY_LIGHT, PH_ORANGE} from '@theme/light';
import Icon from 'react-native-vector-icons/FontAwesome';

import DiscussionPage from '@component/discussion';
import MediaPage from '@component/media';
import InfoPage from '@component/info';

class Screen extends Component {

    constructor() {
        super();
        this.state = {
            post: null
        };
    }

    componentDidMount() {
        let {navigation} = this.props;
        let postId = navigation.state.params.id;
        let self = this;
        AsyncStorage
            .getItem('access_token', (err, access_token) => {
                self.access_token = access_token;
                self.fetchPostDetails(postId);
            })
    }

    fetchPostDetails(postId) {
        let self = this;
        var requestObj = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.access_token,
                'Host': HOST
            }
        };
        fetch('https://api.producthunt.com/v1/posts/' + postId, requestObj)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData.post);
                this.setState({
                    post: responseData.post
                });
            });
    }

    renderForeground() {
        let {post} = this.state;
        return (
            <View style={{height: 210, backgroundColor: GREY_LIGHT}}>
                <Image resizeMode={Image.resizeMode.strech} style={styles.screenshot} source={{uri: post.thumbnail.image_url}}>
                    <Image
                        resizeMode={Image.resizeMode.strech}
                        source={require('./../../assets/images/row_bag.png')}
                        style={{flex: 1}}
                    >
                        <View style={styles.imageContainer}>
                            <Text style={styles.name} ellipsizeMode="tail" numberOfLines={1}>{post.name}</Text>
                            <Text style={styles.tagline} ellipsizeMode="tail" numberOfLines={1}>{post.tagline}</Text>
                        </View>
                    </Image>
                </Image>

                <View style={styles.rowContainer}>
                    <View style={[styles.box, {backgroundColor: "white", marginLeft: 15}]}>
                        <View style={styles.rowContainer}>
                            <Icon style={{
                                marginRight: 5,
                                marginTop: 1
                            }} name="caret-up" size={15} color={GREY_DARK}/>
                            <Text style={styles.votes}>{post.votes_count}</Text>
                        </View>
                    </View>

                    <View style={[styles.rightContainer, {marginLeft: 10}]}>
                        <View style={[styles.box, {backgroundColor: PH_ORANGE}]}>
                            <Text style={styles.getIt}>GET IT</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        if (!this.state.post) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={[styles.centering]}
                    color="black"
                    size="large"
                />
            )
        }

        console.log(this.state.post);

        return (
            <ScrollView style={{backgroundColor: "white"}}>
                {this.renderForeground()}
                <InfoPage post={this.state.post}/>
                <MediaPage media={this.state.post.media}/>
                {this.state.post.comments_count ? <DiscussionPage comments={this.state.post.comments}/> : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    screenshot: {
        width: width,
        height: 150
    },
    box: {
        height: 40,
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 5,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    getIt: {
        fontWeight: "bold",
        color: "white"
    },
    imageContainer: {
        padding: 15,
        marginTop: 60
    },
    name: {
        fontSize: 28,
        color: "white",
        fontFamily: 'SFBold',
    },
    tagline: {
        color: "white",
        fontFamily: 'SFRegular',
        fontSize: 13,
    },
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Screen