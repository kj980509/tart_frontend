import React from 'react';
import styled from 'styled-components/native';
import {FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenLayout from '../../../components/ScreenLayOut';
import {pxRatio} from '../../../utils/utils';

// Style: Total Screen Container
const Container = styled.View`
  flex: 1;
  margin-left: ${pxRatio(11.3, 'row')}px;
`;

const Photo = styled.Image`
  align-items: center;
  justify-content: center;
  width: ${pxRatio(190, 'row')}px;
  height: ${pxRatio(180, 'row')}px;
  border-radius: 13px;
  background-color: gray;
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
function HomeRenderItem(props) {
  const navigation = useNavigation();
  const ArtItem = ({item: art}) => {
    const goToDetail = () =>
      navigation.navigate('Home', {
        artId: art?.id,
      });
    return (
      <ScreenLayout>
        <Container>
          <TouchableOpacity onPress={goToDetail}>
            <Photo
              style={{resizeMode: 'cover', width: 190, height: 180}}
              source={{uri: art?.photos[0]?.imageUrl}}
            />
          </TouchableOpacity>
          <ArtInformation>
            <Title>{art?.title}</Title>
            <UserName>{art?.user?.userName}</UserName>
          </ArtInformation>
          <AuctionInformation>
            <AuctionTime>Time 1day 2h</AuctionTime>
            <AuctionPriceText>경매가</AuctionPriceText>
            <PresentBid> {art?.presentPrice}</PresentBid>
          </AuctionInformation>
        </Container>
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

export default HomeRenderItem;
