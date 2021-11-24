import React from 'react';
import styled from 'styled-components/native';
import {logUserOut} from '../../apollo';
import {Button, View, Text} from 'react-native';
import {gql, useApolloClient, useSubscription} from '@apollo/client';

const NoticeContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const BID_ALARM = gql`
  subscription bidAlarm {
    bidAlarm {
      user {
        userName
      }
    }
  }
`;

export default function Notice({navigation}) {
  const {data, loading} = useSubscription(BID_ALARM);
  if (!loading) {
    console.log(data.bidAlarm.user.userName);
  }

  return (
    <NoticeContainer>
      <View>
        <Text>New comment: {!loading && data.bidAlarm.user.userName}</Text>
      </View>
    </NoticeContainer>
  );
}
