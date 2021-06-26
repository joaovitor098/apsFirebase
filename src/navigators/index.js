import React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Auth} from '../screens';
import Drawer from './drawer';

const getHeaders = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'App RN';

  switch (routeName) {
    case 'Signup':
      return 'Cadastrar Usuário';
    case 'Usuarios':
      return 'Usuários';
  }
};

const Stack = createStackNavigator();

export default function Navigator() {
  const getData = async () => {
    return await AsyncStorage.getItem('@storage_Key');
  };

  const auth = getData();

  return (
    <NavigationContainer>
      {auth ? (
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: '##0000FF',
            },
          }}>
          <Stack.Screen
            options={route => ({
              headerTitle: getHeaders(route),
            })}
            name="App RN"
            component={Drawer}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: true}}
            name="Auth"
            component={Auth}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
