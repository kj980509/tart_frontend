import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import styled from 'styled-components/native';
import {ART_FRAGMENT} from '../fragments/fragments';
import ScreenLayout from '../ScreenLayOut';
import {pxRatio} from '../../utils/utils';

const OTHER_ART = gql`
  query otherArts($artId: Int!, $userId: Int!) {
    otherArts(artId: $artId, userId: $userId) {
      ...ArtFragment
    }
  }
  ${ART_FRAGMENT}
`;

const OtherArtContainer = styled.View`
  margin-left: ${pxRatio(18, 'row')}px;
  margin-top: ${pxRatio(10, 'column')}px;
  background-color: black;
  align-items: center;
  flex-direction: row;
`;
const OtherPhoto = styled.Image`
  flex: 1;
  width: ${pxRatio(100, 'row')}px;
  height: ${pxRatio(100, 'column')}px;
  border-radius: 13px;
`;

export default function OtherArts(props) {
  const {data, loading, refetch} = useQuery(OTHER_ART, {
    variables: {
      //artId와 userId는 Photo.js에서 props로 받아옴
      artId: props?.artId,
      userId: props?.userId,
    },
  });
  const navigation = useNavigation();
  const OtherArtItem = ({item: other}) => {
    return (
      <OtherArtContainer>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ArtDetail', {
              artId: other?.id,
            })
          }>
          <OtherPhoto source={{uri: other?.photos[0]?.imageUrl}} />
        </TouchableOpacity>
      </OtherArtContainer>
    );
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data?.otherArts}
        keyExtractor={item => '' + item.id}
        //42번째줄~52번째줄에서 구현
        renderItem={OtherArtItem}
      />
    </ScreenLayout>
  );
}
