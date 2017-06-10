'use strict';

import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from "react-native";

import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window');

var _height = 250;

class MediaPage extends Component {

    constructor() {
        super();
        this.state = {
            medias: null
        };
    }

    componentDidMount() {
        this.setState({
            medias: this.props.media
        });
    }

    _keyExtractor = (item, index) => item.id;

    calcWidth(media, height) {
        var height_perc = (height/media.original_height) * 100;
        var width = (height_perc/100) * media.original_width;
        return width;
    }

    render() {
        if (!this.state.medias) {
            return null;
        }
        let self = this;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Media</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{height: 300}}>
                    {this.state.medias.map(function (media) {
                        if(media.media_type != 'image') {
                            return null;
                        }
                        var newWidth = self.calcWidth(media, 300);
                        return (
                            <Image
                                key={media.id}
                                source={{uri: media.image_url}}
                                resizeMethod="auto"
                                style={{
                                    borderRadius: 5,
                                    marginRight: 15,
                                    height: 300,
                                    width: newWidth,
                                    flex: 1,
                                    alignSelf: 'stretch',
                                    resizeMode: 'contain'
                                }}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        margin: 15
    },
    title: {
        color: "#1a1a1a",
        fontSize: 25,
        fontFamily: "SFBold"
    }
});

module.exports = MediaPage;
