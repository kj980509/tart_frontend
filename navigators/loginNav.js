import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/loggedOut/Login';
const Stack = createStackNavigator();
import mainPage from '../screens/maigPage';
import Notice from '../screens/loggedIn/Notice';
import Home from '../screens/loggedIn/Home/Home';
import ArtDetail from '../screens/loggedIn/Auction/ArtDetail';

export default function LoginNav() {
  return (
    <Stack.Navigator
      screeOptions={{
        headerBackTitleVisible: false,
        headerTitle: false,
        headerShown: false,
        headerTransparent: true,
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name={'mainPage'}
        component={mainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Home'}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Notice'}
        component={Notice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'ArtDetail'}
        component={ArtDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
