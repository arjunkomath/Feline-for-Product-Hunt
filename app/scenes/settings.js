import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
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

    render() {
        let selected = [].concat(toJS(CategoryStore.categories));
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Add Topics</Text>
                <SelectMultiple
                    items={categories}
                    selectedItems={selected}
                    labelStyle={styles.button_text}
                    onSelectionsChange={this.onSelectionsChange}/>
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
    button_text: {
        marginLeft: 10,
        color: '#3F51B5',
        fontSize: 15,
        fontFamily: "SFRegular"
    },
    title: {
        fontSize: 30,
        color: "#1a1a1a",
        fontFamily: "SFBold"
    }
});

export default Screen