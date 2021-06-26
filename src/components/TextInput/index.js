import React from 'react';
import {TextInput, Text} from 'react-native';
import styles from './styles';

export default function Input(props) {
  return (
    <>
      {props.errors && <Text>Teste de errors</Text>}
      <TextInput {...props} style={styles.input} />
    </>
  );
}
