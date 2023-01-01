import 'react-native-url-polyfill/auto';

import * as React from 'react';
import { StatusBar } from 'expo-status-bar';

import {AppNavigator} from './src';
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
