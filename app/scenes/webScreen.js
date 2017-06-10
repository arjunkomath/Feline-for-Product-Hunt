import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import {WebView} from 'react-native';

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
    }

    render() {
        if (!this.state.url) {
            return null;
        }
        return (
            <View style={{backgroundColor: "white", flex: 1}}>
                { this.state.loading ? (
                    <View style={styles.border}>
                        <ActivityIndicator
                            animating={true}
                            style={[{height: 40}]}
                            color="black"
                            size="small"
                        />
                    </View>
                ) : null }
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
        borderBottomWidth: 1
    }
});

export default Screen