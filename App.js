import React, {useEffect, useState} from 'react';
import {ApolloProvider, useReactiveVar} from '@apollo/client';
import client, {isLoggedInVar, tokenVar} from './apollo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import LoggedOutNav from './navigators/loggedOutNav';
import LoginNav from './navigators/loginNav';
function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preload = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    } else {
      console.log('Token Not Found.');
    }
  };
  if (loading) {
    preload().then(onFinish());
  }
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoginNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
export default App;
