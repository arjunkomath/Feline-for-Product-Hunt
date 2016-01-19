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
} = React;

var Calendar = require('react-native-calendar-android');

var DatePicker = React.createClass({

    getInitialState: function() {
        return {
            date: this.props.date,
            navigator: this.props.navigator
        };
    },

    componentDidMount: function() {
        console.log(this.state.date);
    },

    render: function() {
        return (
            <View style={styles.container}>
            <Calendar
            width={300}
            topbarVisible={true}
            arrowColor="#FF5722"
            firstDayOfWeek="monday"
            showDate="all"
            currentDate={[ this.state.date ]}
            selectionMode="single"
            selectionColor="#FFCCBC"
            selectedDates={[ this.state.date ]}
            onDateChange={(data) => {
                this.state.navigator.push({
                    index: 0,
                    pass_date: data.date
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
    },
});

module.exports = DatePicker;
