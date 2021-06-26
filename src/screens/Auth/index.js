import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import Container from '../../components/Container';
import Card from '../../components/Card';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../services';

export default function Auth({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      Alert.alert('Erro ao tentar acessar');
    }
  };

  function handleSubmit() {
    try {
      if (email && password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            storeData('connect');
            navigation.navigate('Usuarios');
          })
          .catch(error => {
            if (error.code === 'auth/wrong-password') {
              Alert.alert(
                'Não foi possível efetuar o login',
                'Senha incorreta',
              );
            } else {
              Alert.alert(
                'Erro ao efetuar o login',
                'Verifique os campos e tente novamente',
              );
            }
          });
      } else {
        Alert.alert('Campos inválidos', 'Preencha os campos corretamente');
      }
    } catch (error) {
      Alert.alert(
        'Não foi possível efetuar o login',
        'Tente novamente mais tarde',
      );
    }
  }

  function handleAdd() {
    navigation.navigate('Signup');
  }

  return (
    <Container>
      <Card>
        <TextInput
          onChangeText={value => setEmail(value)}
          placeholder="E-mail"
          value={email}
          name="email"
        />
        <TextInput
          onChangeText={value => setPassword(value)}
          placeholder="Senha"
          value={password}
          name="password"
        />
        <View style={{flexDirection: 'row'}}>
          <Button label="Acessar" handle={handleSubmit} />
          <Button label="Registrar-se" handle={handleAdd} />
        </View>
      </Card>
    </Container>
  );
}
