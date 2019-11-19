/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from "apollo-boost";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import Home from './app/screens/home';

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

const tabNavigation = createBottomTabNavigator({
  Home
});

const AppContainer = createAppContainer(tabNavigation);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppContainer/>
    </ApolloProvider>
  );
};

export default App;
