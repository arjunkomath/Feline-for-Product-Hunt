/**
* Comments Reply Widget
*/
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    IntentAndroid
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
import ParsedText from 'react-native-parsed-text';

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
    },

    handleUrlPress: function(url) {
        this.state.navigator.push({
            index: 2,
            passProps: {url: url, title: url},
        });
    },

    handleEmailPress: function(email) {
        IntentAndroid.openURL('mailto:'+email);
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
            <View style={styles.container}>

            <TouchableOpacity onPress={() => this._viewProfile(comment.user)}>
            <Image source={{uri: comment.user.image_url['50px'] }} style={styles.thumbnail} />
            </TouchableOpacity>

            <View style={{flex: 1 }}>

                <ParsedText
                    style={styles.body}
                    parse={
                [
                    {type: 'url', style: styles.url, onPress: this.handleUrlPress},
                    {type: 'email', style: styles.url, onPress: this.handleEmailPress},
                ]
            }
                >
                    {comment.body}
                </ParsedText>

            <Text style={styles.votes}><Icon name="chevron-up" size={10} color="#000000" /> {comment.votes} - {comment.user.name}</Text>
            </View>
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 50,
    },
    url: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3F51B5',
        marginLeft: 20,
        textDecorationLine: 'underline',
    },
    body: {
        fontSize: 14,
        color: '#3e3e3e',
        marginLeft: 20,
    },
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
