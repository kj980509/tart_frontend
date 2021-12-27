import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabsStack from './TabsStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="홈"
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              color="black"
              name={focused ? 'home' : 'home-outline'}
              size={27}
            />
          ),
        }}>
        {() => <TabsStack screenName="Home" />}
      </Tab.Screen>
      <Tab.Screen
        name="커뮤니티"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons
              color="black"
              name={focused ? 'people' : 'people-outline'}
              size={28}
            />
          ),
        }}>
        {() => <TabsStack screenName="PostMain" />}
      </Tab.Screen>
      <Tab.Screen
        name="경매 올리기"
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              color="black"
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={28}
            />
          ),
        }}>
        {() => <TabsStack screenName="CreateArt" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
