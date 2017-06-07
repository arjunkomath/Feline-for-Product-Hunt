'use strict';

import React, {Component} from "react";
import {
    StyleSheet,
    View,
    ListView,
    Image,
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

    render() {
        if (!this.state.medias) {
            return null;
        }
        return (
            <View style={styles.container}>
                {this.state.medias.map((media) => {
                    return (
                        <Image
                            key={media.id}
                            source={{uri: media.image_url}} resizeMode={Image.resizeMode.cover}
                            style={{
                                width: width,
                                height: width
                            }}
                        />
                    )
                })}
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = MediaPage;
