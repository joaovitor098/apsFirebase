import React from 'react';
import {View} from 'react-native';
import styles from './styles';

export default function Card({children, style}) {
  return <View style={[styles.card, {...style}]}>{children}</View>;
}
