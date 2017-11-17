import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Image
} from 'react-native';
import {PH_ORANGE} from '@theme/light';
import analytics from '@store/analytics';

/**
 * About Page
 */
class Screen extends Component {

    static navigationOptions = {
        tabBarLabel: 'About'
    };

    constructor(props) {
        super(props);
        this.state = {
            contributors: []
        };
    }

    componentDidMount() {
        var self = this;
        analytics.logEvent("View About Page");
        fetch('https://api.github.com/repos/arjunkomath/Feline-for-Product-Hunt/contributors')
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                self.setState({
                    contributors: responseData
                });
            })
            .catch((err) => {
                if (err) {
                    console.log("Error", err);
                }
            });
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer}>

                <Image
                    style={{
                        width: 100,
                        height: 100
                    }}
                    source={require('./../../assets/images/icon.png')}/>

                <Text style={styles.feline}>Feline</Text>
                <Text style={styles.tagline}>for Product Hunt</Text>

                <View style={[styles.button, {marginTop: 15}]}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://play.google.com/store/apps/details?id=com.arjunkomath.product_hunt")
                    }}>
                        <Text style={styles.button_text}>Rate Feline</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://www.paypal.me/ArjunKomath/1.99")
                    }}>
                        <Text style={styles.button_text}>Donate</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://github.com/arjunkomath/Feline-for-Product-Hunt/issues")
                    }}>
                        <Text style={styles.button_text}>Report Issue</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://github.com/arjunkomath/Feline-for-Product-Hunt/issues")
                    }}>
                        <Text style={styles.button_text}>Request Feature</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.contributors}>Contributors</Text>
                {
                    this.state.contributors.length ?
                        this.state.contributors.map(function (user) {
                            return (
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={() => {
                                        Linking.openURL(user.html_url)
                                    }}>
                                        <Text style={styles.button_text}>{user.login}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                        : null
                }
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://github.com/arjunkomath/Feline-for-Product-Hunt")
                    }}>
                        <Text style={styles.button_text}>Be the game changer!</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.button, { marginTop: 15, marginBottom: 50 }]}>
                    <Text style={styles.button_text_grey}>Version 2.2.1</Text>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        backgroundColor: "white"
    },
    button: {
        marginLeft: 15,
        height: 45,
        borderBottomWidth: 1,
        justifyContent: 'center',
        borderBottomColor: '#e3e3e3',
    },
    button_text: {
        marginLeft: 10,
        color: '#3F51B5',
        fontSize: 15,
        fontFamily: "SFRegular"
    },
    button_text_grey: {
        marginLeft: 10,
        fontSize: 15,
        fontFamily: "SFRegular"
    },
    feline: {
        fontSize: 40,
        fontFamily: "SFBold",
        color: "#1a1a1a"
    },
    tagline: {
        fontSize: 20,
        marginTop: -10,
        fontFamily: "SFRegular",
        color: "#1a1a1a",
        fontFamily: "SFBold"
    },
    contributors: {
        fontSize: 20,
        marginTop: 30,
        marginBottom: 15,
        fontFamily: "SFRegular",
        color: "#1a1a1a",
        fontFamily: "SFBold"
    }
});

export default Screen