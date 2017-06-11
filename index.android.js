/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';
import App from './app/app';
import {Client} from 'bugsnag-react-native';

export default class feline extends Component {

    constructor() {
        super();
        const bugsnag = new Client();
    }

    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('feline', () => feline);
