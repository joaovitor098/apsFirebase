import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './src/navigators';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#0000FF" />
      <Navigator />
    </>
  );
}
