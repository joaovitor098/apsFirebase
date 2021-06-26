import React from 'react';
import {KeyboardAvoidingView} from 'react-native';

import styles from './styles';

export default function Container({style, children}) {
  return (
    <KeyboardAvoidingView style={[styles.container, {...style}]}>
      {children}
    </KeyboardAvoidingView>
  );
}
