import React from 'react';
import styled from 'styled-components/native';
import {Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import {pxRatio} from '../../../utils/utils';
import ScreenLayout from '../../../components/ScreenLayOut';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SEE_POST_QUERY = gql`
  query seePost($postId: Int!) {
    seePost(postId: $postId) {
      title
      post
    }
  }
`;

const TotalHeaderContainer = styled.View`
  justify-content: center;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
  margin-top: ${pxRatio(70, 'column')}px;
  height: ${pxRatio(22, 'column')}px;
  background-color: wheat;
`;
const GoBackIcon = styled.TouchableOpacity`
  position: absolute;
  height: ${pxRatio(20, 'column')}px;
  width: ${pxRatio(20, 'row')}px;
`;
const Title = styled.Text`
  font-weight: 700;
  font-size: 18px;
`;

export default function PostDetail(props) {
  const {data, loading} = useQuery(SEE_POST_QUERY, {
    variables: {
      postId: props?.route?.params?.id,
    },
  });
  console.log(data?.seePost);
  return (
    <ScreenLayout loading={loading}>
      <TotalHeaderContainer>
        <GoBackIcon>
          <Ionicons name={'arrow-back'} size={20} />
        </GoBackIcon>
        <Title>{data?.seePost?.title}</Title>
      </TotalHeaderContainer>
    </ScreenLayout>
  );
}
