/**
* Sample React Native App
* https://github.com/facebook/react-native
*/
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    BackAndroid,
} = React;

var Calendar = require('react-native-calendar-android');
import { Toolbar as MaterialToolbar } from 'react-native-material-design';
const GoogleAnalytics = require('react-native-google-analytics-bridge');

var DatePicker = React.createClass({

    getInitialState: function() {
        return {
            date: this.props.date,
            navigator: this.props.navigator
        };
    },

    navigatorPop(){
        this.props.navigator.pop();
        return true;
    },

    componentDidMount: function() {
        BackAndroid.addEventListener('hardwareBackPress', this.navigatorPop);
        GoogleAnalytics.trackScreenView('Date Picker');
    },

    componentWillUnmount(){
        BackAndroid.removeEventListener('hardwareBackPress',this.navigatorPop)
    },

    render: function() {
        return (
            <View style={styles.container}>
            <MaterialToolbar
            title="Pick Date"
            icon={'keyboard-backspace'}
            onIconPress={() => { this.props.navigator.pop()} }
            overrides={{backgroundColor: '#3F51B5'}}
            />
            <Calendar
            width={350}
            topbarVisible={true}
            arrowColor="#3F51B5"
            firstDayOfWeek="monday"
            showDate="all"
            currentDate={[ this.state.date ]}
            selectionMode="single"
            selectionColor="#3F51B5"
            selectedDates={[ this.state.date ]}
            onDateChange={(data) => {
                this.state.navigator.resetTo({
                    index: 0,
                    pass_date: data.date,
                    category: this.props.category
                });
            }} />
            </View>
        );
    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});

module.exports = DatePicker;
