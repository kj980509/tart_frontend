import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/loggedIn/Home/Home';
import PostMain from '../../screens/loggedIn/Post/PostMain';
import ArtDetail from '../../screens/loggedIn/Auction/ArtDetail';
import Notice from '../../screens/loggedIn/Notice/Notice';
import CreateArt from '../../screens/loggedIn/createArt/CreateArt';
import SelectCategory from '../../screens/loggedIn/createArt/SelectCategory';
import ArtSearch from '../../screens/loggedIn/Home/ArtSearch';
import CreatePost from '../../screens/loggedIn/Post/CreatePost';
const Stack = createStackNavigator();

export default function TabsStack({screenName}) {
  return (
    <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
      {screenName === 'Home' ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      ) : null}
      {screenName === 'PostMain' ? (
        <Stack.Screen
          name="PostMain"
          component={PostMain}
          options={{headerShown: false}}
        />
      ) : null}
      {screenName === 'CreateArt' ? (
        <Stack.Screen
          name="CreateArt"
          component={CreateArt}
          options={{headerShown: false}}
        />
      ) : null}
      <Stack.Screen
        name="ArtDetail"
        component={ArtDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notice"
        component={Notice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'SelectCategory'}
        component={SelectCategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'ArtSearch'}
        component={ArtSearch}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'CreatePost'}
        component={CreatePost}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
