import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Image
} from 'react-native';
import {PH_ORANGE} from '@theme/light';
import analytics from '@store/analytics';

class Screen extends Component {

    static navigationOptions = {
        tabBarLabel: 'About'
    };

    componentDidMount() {
        analytics.logEvent("View About Page");
    }

    render() {
        return (
            <View style={styles.mainContainer}>

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

                <View style={[styles.button, {marginTop: 15}]}>
                    <Text style={styles.button_text_grey}>v2.1.0</Text>
                </View>

            </View>
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
    }
});

export default Screen