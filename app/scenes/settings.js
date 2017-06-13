import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import analytics from '@store/analytics';
import SelectMultiple from 'react-native-select-multiple'

import {observer} from 'mobx-react/native';
import  {toJS} from 'mobx';
import CategoryStore from '@store/category';

const categories = ['tech', 'games', 'books'];

@observer
class Screen extends Component {

    static navigationOptions = {
        tabBarLabel: 'Settings'
    };

    componentDidMount() {
        analytics.logEvent("View Settings Page");

    }

    onSelectionsChange = (selected) => {
        let categories = [];
        selected.forEach(function (category) {
            categories.push(category.value);
        });
        CategoryStore.update(categories);
    }

    onSelectionsChangeTopics = (selected) => {
        let topics = [];
        selected.forEach(function (topic) {
            topics.push(topic.value);
        });
        CategoryStore.updateTopics(topics);
    }

    render() {
        let selectedCategories = [].concat(toJS(CategoryStore.categories));
        let selectedTopics = [].concat(toJS(CategoryStore.topics));
        return (
            <ScrollView style={styles.mainContainer}>
                <Text style={styles.title}>Categories</Text>
                <SelectMultiple
                    items={categories}
                    selectedItems={selectedCategories}
                    labelStyle={styles.button_text}
                    onSelectionsChange={this.onSelectionsChange}/>

                <Text style={[styles.title, {marginTop: 20}]}>Trending Topics</Text>
                <SelectMultiple
                    style={{marginBottom: 20}}
                    items={toJS(CategoryStore.trendingTopics)}
                    selectedItems={selectedTopics}
                    labelStyle={styles.button_text}
                    onSelectionsChange={this.onSelectionsChangeTopics}/>

                <TouchableOpacity onPress={() => {
                    CategoryStore.reload();
                }}>
                    <View style={styles.button}>
                        <Text style={styles.button_text}>Save</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    CategoryStore.reset();
                }}>
                    <View style={[styles.button, {marginBottom: 50}]}>
                        <Text style={styles.button_text}>Reset</Text>
                    </View>
                </TouchableOpacity>

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
        backgroundColor: "white",
        paddingBottom: 30
    },
    button: {
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
    title: {
        fontSize: 20,
        color: "#1a1a1a",
        fontFamily: "SFBold"
    }
});

export default Screen