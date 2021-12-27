import React from 'react';
import styled from 'styled-components/native';
import {pxRatio} from '../../../utils/utils';
import {useNavigation} from '@react-navigation/native';

const PostDetailButton = styled.TouchableOpacity`
  margin-left: ${pxRatio(15, 'row')}px;
  margin-top: ${pxRatio(9, 'column')}px;
  margin-bottom: ${pxRatio(10, 'column')}px;
`;
const Time = styled.Text`
  font-size: ${pxRatio(13, 'row')}px;
  font-weight: 700;
  color: #676767;
`;
const PostContainer = styled.View`
  width: 100%;
  border: 1px solid white;
  border-bottom-color: #e5e5e5;
`;
const Title = styled.Text`
  font-size: ${pxRatio(17, 'row')}px;
  font-weight: 700;
  margin-bottom: ${pxRatio(4, 'column')}px;
`;
const PostExplain = styled.Text`
  font-size: ${pxRatio(15, 'row')}px;
  font-weight: 500;
  margin-bottom: ${pxRatio(5, 'column')}px;
`;

export default function PostItem(Post) {
  const navigation = useNavigation();
  const CurrentTime = ((Date.now() - Post?.createdAt) / 1000 / 60).toFixed(0);
  const B = Post?.createdAt;
  const C = parseInt(B);
  console.log(
    new Date().getFullYear(),
    new Date(C).getFullYear() +
      '년' +
      new Date(C).getMonth() +
      1 +
      '월' +
      new Date(C).getDate() +
      '일' +
      new Date(C).getHours() +
      '시' +
      new Date(C).getMinutes() +
      '분',
  );
  return (
    <PostContainer>
      <PostDetailButton
        onPress={() =>
          navigation.navigate('PostDetail', {
            postId: Post?.id,
          })
        }>
        <Title>{Post?.title}</Title>
        <PostExplain>{Post?.post}</PostExplain>
        <Time>{CurrentTime}분전</Time>
      </PostDetailButton>
    </PostContainer>
  );
}
