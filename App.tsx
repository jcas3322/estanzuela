/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import Tabs from './src/components/Tabs.js/Tabs';
import LogIn from './src/components/LogIn/LogIn';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalContextProvider } from './GlobalContextProvider';

const App = ():React.JSX.Element =>{

  return(
    <GlobalContextProvider>
      <Tabs />
    </GlobalContextProvider>
  )
}

const styles = StyleSheet.create({
});

export default App;
