/**
* Comments Reply Widget
*/
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');

import Store from 'react-native-store';
const DB = {
    'theme': Store.model('theme')
}

var themes = require('./Themes/main');

var ChildCommentsWidget = React.createClass({

    getInitialState: function() {
        return {
            data: this.props.comment,
            navigator: this.props.navigator,
            children: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    },

    _viewProfile: function(user) {
        this.state.navigator.push({
            index: 4,
            passProps: {user: user}
        });
    },

    componentDidMount: function() {
        if(this.state.data.length > 0) {
            this.setState({
                children: this.state.children.cloneWithRows(this.state.data)
            });
        }
        DB.theme.find().then( (resp) => {
            var theme = themes[resp[0].theme ? resp[0].theme : 'light'];
            this.setState({theme: theme});
        });
    },

    render: function() {
        if(this.state.data.length == 0) {
            return (<View></View>);
        }
        return (
            <ListView
            dataSource={this.state.children}
            renderRow={this.renderPosts}
            style={{flex: 1, marginTop: 5, marginBottom: 5}}>
            </ListView>
        );
    },

    renderPosts: function(comment) {
        return (
            <View style={this.mainBag()}>

            <TouchableOpacity onPress={() => this._viewProfile(comment.user)}>
            <Image source={{uri: comment.user.image_url['50px'] }} style={styles.thumbnail} />
            </TouchableOpacity>

            <View style={{flex: 1 }}>
            <Text style={this.bodyStyle()}>{comment.body}</Text>
            <Text style={styles.votes}><Icon name="chevron-up" size={10} color="#000000" /> {comment.votes} - {comment.user.name}</Text>
            </View>
            </View>
        );
    },

    mainBag: function() {
        if(this.state.theme){
            return {
                flex: 1,
                flexDirection: 'row',
                color: this.state.theme.foreground,
                backgroundColor: this.state.theme.childBackground,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
            }
        } else return {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#F5F5F5',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
        }
    },

    bodyStyle: function() {
        if(this.state.theme){
            return {
                fontSize: 14,
                color: this.state.theme.foreground,
                marginLeft: 20,
            }
        } else return {
            fontSize: 14,
            color: '#3e3e3e',
            marginLeft: 20,
        }
    },

});

var styles = StyleSheet.create({
    votes: {
        fontSize: 10,
        color: '#3e3e3e',
        marginLeft: 20,
    },
    thumbnail: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
});

module.exports = ChildCommentsWidget;
