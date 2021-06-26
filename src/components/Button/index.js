import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

export default function Button({label, handle}) {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => handle()}>
      <Text style={styles.title}>{label}</Text>
    </TouchableOpacity>
  );
}
