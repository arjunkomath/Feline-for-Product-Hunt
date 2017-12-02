import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch
} from 'react-native';
import analytics from '@store/analytics';

import {observer} from 'mobx-react/native';
import  {toJS} from 'mobx';
import CategoryStore from '@store/category';

import theme from '@store/theme'

/**
 * Settings Page
 */
@observer
class Screen extends Component {

    static navigationOptions = {
        tabBarLabel: 'Settings'
    };

    componentDidMount() {
        analytics.logEvent("View Settings Page");
    }

    render() {
        let topics = toJS(CategoryStore.trendingTopics);
        let categories = toJS(CategoryStore.defaultCategories);
        return (
            <View style={[styles.mainContainer, {backgroundColor: theme.colors.MAIN_BG, borderTopColor: theme.colors.INACTIVE_TINT_COLOR}]}>
                <ScrollView style={{flex: 1}}>

                    <Text style={[styles.title, {color: theme.colors.MAIN_TEXT}]}>Categories</Text>
                    <View style={{ backgroundColor: theme.colors.MAIN_BG }}>
                        {
                            categories.map((category) => {
                                return (
                                    <View style={{ borderBottomWidth: 1, height: 55, marginTop: 5, borderBottomColor: theme.colors.INACTIVE_TINT_COLOR, flexDirection: 'row' }} key={category.value}>
                                        <Switch thumbTintColor={theme.colors.BUTTON_TEXT} onTintColor={theme.colors.INACTIVE_TINT_COLOR} value={category.selected} onValueChange={(value) => CategoryStore.selectCategory(category, value)} />
                                        <Text style={{ color: theme.colors.BUTTON_TEXT, fontSize: 15, marginLeft: 15, alignSelf: 'center', fontFamily: "SFRegular" }}>{category.label}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <Text style={[styles.title, {marginTop: 20, color: theme.colors.MAIN_TEXT}]}>Trending Topics</Text>
                    <View style={{ backgroundColor: theme.colors.MAIN_BG, marginBottom: 20 }}>
                        {
                            topics.map((topic) => {
                                return (
                                    <View style={{ borderBottomWidth: 1, height: 55, marginTop: 5, borderBottomColor: theme.colors.INACTIVE_TINT_COLOR, flexDirection: 'row' }} key={topic.value}>
                                        <Switch thumbTintColor={theme.colors.BUTTON_TEXT} onTintColor={theme.colors.INACTIVE_TINT_COLOR} value={topic.selected} onValueChange={(value) => CategoryStore.selectTopic(topic, value)} />
                                        <Text style={{ color: theme.colors.BUTTON_TEXT, fontSize: 15, marginLeft: 15, alignSelf: 'center', fontFamily: "SFRegular" }}>{topic.label}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>

                    <Text style={[styles.title, { color: theme.colors.MAIN_TEXT }]}>Look and Feel</Text>
                    <View style={{ borderBottomWidth: 1, height: 55, marginTop: 5, marginBottom: 20, borderBottomColor: theme.colors.INACTIVE_TINT_COLOR, flexDirection: 'row' }}>
                        <Switch thumbTintColor={theme.colors.BUTTON_TEXT} onTintColor={theme.colors.INACTIVE_TINT_COLOR} value={theme.current_theme == 'dark'} onValueChange={(value) => theme.toggleDark(value)} />
                        <Text style={{ color: theme.colors.BUTTON_TEXT, fontSize: 15, marginLeft: 15, alignSelf: 'center', fontFamily: "SFRegular" }}>Dark Theme</Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                        CategoryStore.reload();
                    }}>
                        <View style={[styles.button, {borderBottomColor: theme.colors.INACTIVE_TINT_COLOR}]}>
                            <Text style={[styles.button_text, {color: theme.colors.BUTTON_TEXT}]}>Save</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        CategoryStore.reset();
                    }}>
                        <View style={[styles.button, {marginBottom: 50, borderBottomColor: theme.colors.INACTIVE_TINT_COLOR}]}>
                            <Text style={[styles.button_text, {color: theme.colors.BUTTON_TEXT}]}>Reset</Text>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 15,
        borderTopWidth: 1
    },
    button: {
        height: 45,
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    button_text: {
        marginLeft: 10,
        fontSize: 15,
        fontFamily: "SFRegular"
    },
    title: {
        fontSize: 20,
        color: "#1a1a1a",
        fontFamily: "SFBold"
    }
});

export default Screen