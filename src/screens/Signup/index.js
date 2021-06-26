import React, {useState} from 'react';
import {ScrollView, Alert} from 'react-native';
import Container from '../../components/Container';
import firebase from '../../services';
import Card from '../../components/Card';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

export default function Singup({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  function handleSubmit() {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          firebase
            .database()
            .ref('users')
            .child(res.user.uid)
            .set({
              name,
              email,
              phone,
              password,
              city,
            })
            .then(() => {
              Alert.alert('Cadastrado com sucesso!', 'Seja bem vindo!!!');
              navigation.navigate('Usuarios');
            });
        })
        .catch(() => {
          Alert.alert(
            'Não foi possível criar seu cadastro',
            'Verifique os campos e tente novamente',
          );
        });
    } catch (error) {
      Alert.alert(
        'Não foi possível criar seu cadastro',
        'Tente novamente mais tarde',
      );
    }
  }

  return (
    <Container>
      <Card>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            onChangeText={value => setName(value)}
            placeholder="Nome do usuário"
            value={name}
            name="name"
          />
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
          <TextInput
            onChangeText={value => setPhone(value)}
            placeholder="Telefone"
            value={phone}
            name="phone"
          />
          <TextInput
            onChangeText={value => setCity(value)}
            placeholder="Cidade"
            value={city}
            name="city"
          />
          <Button label="Acessar" handle={handleSubmit} />
        </ScrollView>
      </Card>
    </Container>
  );
}
