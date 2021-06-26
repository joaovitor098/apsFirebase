import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Signup, Users} from '../screens';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Usuarios" component={Users} />
      <Drawer.Screen name="Cadastrar Usuário" component={Signup} />
    </Drawer.Navigator>
  );
}
