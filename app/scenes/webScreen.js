import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Linking,
    TouchableOpacity
} from 'react-native';
import {WebView} from 'react-native';
import analytics from '@store/analytics';

/**
 * Show WebView
 */
class Screen extends Component {

    constructor() {
        super();
        this.state = {
            url: null,
            loading: true
        };
    }

    componentDidMount() {
        let {navigation} = this.props;
        let url = navigation.state.params.url;
        this.setState({
            url: url
        });
        analytics.logEvent("Load WebView", {
            url: url
        })
    }

    render() {
        if (!this.state.url) {
            return null;
        }
        return (
            <View style={{backgroundColor: "white", flex: 1}}>
                <View style={styles.border}>
                    { this.state.loading ? (
                        <ActivityIndicator
                            animating={true}
                            style={[{height: 50}]}
                            color="black"
                            size="small"
                        />
                    ) : (
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(this.state.url)
                        }}>
                            <Text style={styles.title}>Preview in Browser</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <WebView
                    onLoad={() => {
                        this.setState({
                            loading: false
                        })
                    }}
                    source={{uri: this.state.url}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    border: {
        borderBottomColor: '#3e3e3e',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    title: {
        color: '#1a1a1a',
        fontFamily: "SFBold"
    }
});

export default Screen