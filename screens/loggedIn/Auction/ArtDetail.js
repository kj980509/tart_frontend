import React from 'react';
import {useQuery} from '@apollo/client';
import {ART_FRAGMENT} from '../../../components/fragments/fragments';
import {gql} from '@apollo/client';
import {Image, RefreshControl, View, Text} from 'react-native';
import styled from 'styled-components/native';
import {css} from 'styled-components/native';
import {pxRatio} from '../../../utils/utils';
import {useState} from 'react';
import ArtPhotoSwiper from '../../../components/art/ArtPhotoSwiper';
import ScreenLayout from '../../../components/ScreenLayOut';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OtherArts from '../../../components/art/OhterArts';
import ArtQuestions from '../../../components/art/ArtQuestions';

const like = require('../../../asset/like.png');
const SEE_ART_QUERY = gql`
  query seeArt($artId: Int!) {
    seeArt(artId: $artId) {
      ...ArtFragment
      user {
        id
        profile
        userName
        isMe
      }
      bid {
        id
        price
      }
      presentPrice
      minimumPrice
    }
  }
  ${ART_FRAGMENT}
`;

const Photos = styled.ScrollView`
  margin-top: ${pxRatio(60, 'column')}px;
`;
const UserInfoContainer = styled.View`
  height: ${pxRatio(50, 'column')}px;
  margin-left: ${pxRatio(18, 'column')}px;
  margin-right: ${pxRatio(18, 'column')}px;
  margin-top: ${pxRatio(10, 'column')}px;
  background-color: gold;
`;
const LikeView = styled.View`
  background-color: blue;
  width: ${pxRatio(40, 'row')};
`;

const InfoCategoryContainer = styled.View`
  background-color: wheat;
  height: ${pxRatio(40, 'column')}px;
`;
const InfoCategoryBar = styled.View`
  flex-direction: row;
  height: ${pxRatio(40, 'column')}px;
  width: ${pxRatio(200, 'column')}px;
`;
const ArtExplanation = styled.TouchableOpacity`
  flex: 1;
  border-top-right-radius: 10px;
  border-top-width: ${pxRatio(1, 'row')}px;
  border-right-width: ${pxRatio(1, 'row')}px;
  border-top-right-radius: 10px;
  ${props => {
    console.log(props.theme);
    if (props.theme !== true) {
      return css`
        border-bottom-width: ${pxRatio(1, 'row')};
      `;
    }
  }};
`;
const QnA = styled.TouchableOpacity`
  flex: 1;
  border-top-width: ${pxRatio(1, 'row')}px;
  border-left-width: ${pxRatio(1, 'row')}px;
  border-right-width: ${pxRatio(1, 'row')}px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  ${props => {
    console.log(props.theme);
    if (props.theme !== true) {
      return css`
        border-bottom-width: ${pxRatio(1, 'row')};
      `;
    }
  }};
`;

const ArtInfoContainer = styled.View`
  background-color: aquamarine;
  margin-top: 10px;
  height: ${pxRatio(120, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
`;

export default function ArtDetail(props) {
  // Query: seeTotal
  const {data, loading, refetch} = useQuery(SEE_ART_QUERY, {
    variables: {
      artId: props.route?.params?.artId,
    },
  });

  const [isQnA, setIsQnA] = useState(false);
  const [isArtInfo, setIsArtInfo] = useState(true);
  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  console.log(data?.seeArt);
  return (
    <ScreenLayout loading={loading}>
      <View>
        <Photos
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          style={{backgroundColor: 'white'}}
          contentContainerStyle={{
            backgroundColor: 'white',
          }}
          showsVerticalScrollIndicator={false}>
          <ArtPhotoSwiper photos={data?.seeArt?.photos} />
        </Photos>
      </View>
      <UserInfoContainer>
        <LikeView>
          <TouchableOpacity>
            <Image source={like} />
          </TouchableOpacity>
        </LikeView>
      </UserInfoContainer>
      <InfoCategoryContainer>
        <InfoCategoryBar>
          <ArtExplanation
            onPress={() => {
              setIsArtInfo(true);
              setIsQnA(false);
            }}
            theme={isArtInfo}
          />
          <QnA
            onPress={() => {
              setIsQnA(true);
              setIsArtInfo(false);
            }}
            theme={isQnA}
          />
        </InfoCategoryBar>
      </InfoCategoryContainer>
      <ArtInfoContainer>
        {isArtInfo ? (
          <Text>{data?.seeArt?.explain}</Text>
        ) : (
          <ArtQuestions questions={data?.seeArt?.questions} />
        )}
      </ArtInfoContainer>
      <OtherArts artId={data?.seeArt?.id} userId={data?.seeArt?.user?.id} />
    </ScreenLayout>
  );
}
