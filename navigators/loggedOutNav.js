import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/loggedOut/Login';
import SignUp from '../screens/loggedOut/signUp';
import SetPassword from '../screens/loggedOut/SetPassword';
const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      screeOptions={{
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: 'white',
        headerShown: false,
      }}>
      <Stack.Screen
        name={'Login'}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'SignUp'}
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'SetPassword'}
        component={SetPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
