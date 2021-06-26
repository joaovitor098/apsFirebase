import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Container from '../../components/Container';
import firebase from '../../services';
import Card from '../../components/Card';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

import {FlatList} from 'react-native';

export default function User({navigation}) {
  const [data, setData] = useState();

  async function handleSigout() {
    await AsyncStorage.setItem('@storage_Key', '');
  }

  function handleAdd() {
    navigation.navigate('Signup');
  }

  useEffect(() => {
    firebase
      .database()
      .ref('cadastros')
      .on('value', snapshot => {
        snapshot.forEach(item => {
          setData(prevState => [
            ...prevState,
            {
              id: item.key,
              name: item.val().name,
              email: item.val().email,
              phone: item.val().phone,
              city: item.val().city,
            },
          ]);
        });
      });
  }, []);
  return (
    <Container>
      <Card>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <Button label="Cadastrar Usuário" handle={handleAdd} />
          }
          ListFooterComponent={<Button label="Sair" handle={handleSigout} />}
          renderItem={({item}) => (
            <View style={styles.viewConteudo}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.title}>{item.email}</Text>
              <Text style={styles.title}>{item.phone}</Text>
              <Text style={styles.title}>{item.city}</Text>
            </View>
          )}
        />
      </Card>
    </Container>
  );
}
