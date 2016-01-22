'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    Image,
} = React;

import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window');

var _height = 250;

var MediaPage = React.createClass({

    getInitialState: function() {
        return {
            data: this.props.media,
            media: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    componentDidMount: function() {
        if(this.state.data.length > 0) {
            this.setState({
                media: this.state.media.cloneWithRows(this.state.data)
            });
        }
    },

    render: function() {
        if(this.state.data.length == 0) {
            return (<View></View>);
        }
        return (
            <ListView
            dataSource={this.state.media}
            renderRow={this.renderPosts}
            style={{flex: 1}}>
            </ListView>
        );
    },

    renderPosts: function(media) {
        return (
            <View style={styles.container}>
            <Image source={{uri: media.image_url}} resizeMode={Image.resizeMode.contain} style={{width :width, height: _height}} />
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

module.exports = MediaPage;
