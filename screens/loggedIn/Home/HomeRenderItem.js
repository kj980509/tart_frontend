import React from 'react';
import styled from 'styled-components/native';
import {FlatList, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenLayout from '../../../components/ScreenLayOut';
import {pxRatio} from '../../../utils/utils';
const PhotoContainer = styled.View`
  margin-top: ${pxRatio(25, 'column')}px;
`;

const Photo = styled.Image`
  align-items: center;
  justify-content: center;
  width: ${pxRatio(190, 'row')}px;
  height: ${pxRatio(180, 'row')}px;
  border-radius: 13px;
  background-color: gray;
`;

const InfoContainer = styled.View`
  margin-top: ${pxRatio(4, 'column')}px;
  flex-direction: row;
`;

// Style: Art Info Container
const ArtInformation = styled.View`
  flex: 1;
  margin-right: ${pxRatio(3, 'row')}px;
  align-items: flex-end;
`;
// Style: Art Info
const Title = styled.Text`
  font-size: 18px;
  color: black;
  font-weight: 700;
`;
const UserName = styled.Text`
  font-weight: 500;
`;
// Style: Auction Info Container
const AuctionInformation = styled.View`
  margin-bottom: ${pxRatio(10, 'column')}px;
`;
// Style: Auction Info
const AuctionTime = styled.Text`
  margin-left: ${pxRatio(17, 'row')}px;
  font-weight: 600;
`;
const AuctionPriceText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: orangered;
`;
const PresentBid = styled(AuctionPriceText)`
  color: black;
`;

/*
 Rendering Item In Home.js on SectionList
 */
export default function HomeRenderItem(props) {
  const navigation = useNavigation();
  const ArtItem = ({item: art}) => {
    const goToDetail = () =>
      navigation.navigate('ArtDetail', {
        artId: art?.id,
      });
    return (
      <ScreenLayout>
        <PhotoContainer>
          <TouchableOpacity onPress={goToDetail}>
            <Photo
              style={{resizeMode: 'cover', width: 190, height: 180}}
              source={{uri: art?.photos[0]?.imageUrl}}
            />
          </TouchableOpacity>
        </PhotoContainer>
        <InfoContainer>
          <ArtInformation>
            <Title>{art?.title}</Title>
            <UserName>{art?.user?.userName}</UserName>
          </ArtInformation>
          <AuctionInformation>
            <AuctionTime>Time 1day 2h</AuctionTime>
            <AuctionPriceText>경매가</AuctionPriceText>
            <PresentBid> {art?.presentPrice}</PresentBid>
          </AuctionInformation>
        </InfoContainer>
      </ScreenLayout>
    );
  };

  return (
    <ScreenLayout>
      <FlatList
        data={props?.Art}
        renderItem={ArtItem}
        keyExtractor={item => '' + item.id}
        numColumns={2}
      />
    </ScreenLayout>
  );
}
