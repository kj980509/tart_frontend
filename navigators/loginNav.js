import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './Tabs/Tabs';

const Stack = createStackNavigator();

//로그인을 했을때만(token이 있을시에만) 올수있는 나비게이터
export default function LoggedInNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Tabs"
        component={Tabs}
      />
    </Stack.Navigator>
  );
}
