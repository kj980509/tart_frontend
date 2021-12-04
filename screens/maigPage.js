import React, {useState, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import {logUserOut} from '../apollo';
import styled from 'styled-components/native';
import {gql, useSubscription} from '@apollo/client';
const BID_ALARM = gql`
  subscription bidAlarm {
    bidAlarm {
      user {
        userName
      }
    }
  }
`;

export default function mainPage({navigation}) {
  const [alarm, setAlarm] = useState(null);
  const {data, loading} = useSubscription(BID_ALARM);
  useEffect(() => {
    if (!loading) {
      setAlarm(true);
    }
  }, [loading, setAlarm]);
  console.log(data);
  return (
    <View>
      <Button title="Notice" onPress={() => navigation.navigate('Notice')} />
      <Button title="Sign Out" onPress={() => logUserOut()} />
      {data ? (
        <Button title="New" onPress={() => navigation.navigate('Notice')} />
      ) : null}
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
