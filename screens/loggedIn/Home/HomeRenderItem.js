import React from 'react';
import styled from 'styled-components/native';
import {FlatList, TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenLayout from '../../../components/ScreenLayOut';
import {pxRatio} from '../../../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {Modal} from  'react-native';

const OrderChangeContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: ${pxRatio(333, 'row')}px;
`;
const OrderChangeText = styled.Text``;

const OrderChangeImage = styled.Image``;

const PhotoContainer = styled.TouchableOpacity`
  margin-top: ${pxRatio(25, 'column')}px;
  width: ${pxRatio(180, 'row')}px;
  height: ${pxRatio(180, 'row')}px;
  margin-left: ${pxRatio(18, 'row')}px;
`;

const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 13px;
`;

const InfoContainer = styled.View`
  margin-top: ${pxRatio(4, 'column')}px;
  flex-direction: row;
`;
const AuctionInformation = styled.View`
  justify-content: center;
  flex-direction: row;
  margin-top: ${pxRatio(27, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
`;
const AuctionPriceTextContainer = styled.View`
  background-color: rgba(41, 55, 128, 1);
  width: ${pxRatio(57, 'row')}px;
  height: ${pxRatio(25, 'column')}px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
const AuctionPriceText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 13px;
`;
const PresentBid = styled.Text`
  margin-left: ${pxRatio(4, 'row')}px;
  margin-top: ${pxRatio(3, 'column')}px;
  font-size: 14px;
  font-weight: 600;
  color: black;
`;

const ArtInformation = styled.View`
  flex: 1;
  width: ${pxRatio(180, 'row')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  position: absolute;
  align-items: flex-end;
`;

const Title = styled.Text`
  font-size: 18px;
  color: black;
  font-weight: 700;
`;
const UserName = styled.Text`
  margin-top: ${pxRatio(4, 'column')}px;
  font-weight: 500;
`;
// Style: Auction Info
const AuctionTime = styled.Text`
  margin-left: ${pxRatio(17, 'row')}px;
  font-weight: 600;
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
        <PhotoContainer onPress={goToDetail}>
          <Photo source={{uri: art?.photos[0]?.imageUrl}} />
        </PhotoContainer>
        <InfoContainer>
          <AuctionInformation>
            <AuctionPriceTextContainer>
              <AuctionPriceText>경매가</AuctionPriceText>
            </AuctionPriceTextContainer>
            <PresentBid> {art?.presentPrice}</PresentBid>
          </AuctionInformation>
          <ArtInformation>
            <Title>{art?.title}</Title>
            <UserName>
              {art?.user?.userName.length < 4 ? art?.user?.userName : '이승혁'}
            </UserName>
          </ArtInformation>
        </InfoContainer>
      </ScreenLayout>
    );
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScreenLayout>
      <Modal>
        <View>
          <Text>asdsa</Text>
        </View>
      </Modal>
      <OrderChangeContainer onPress={() => setModalVisible(true)}>
        <OrderChangeText>asdkjas</OrderChangeText>
        <OrderChangeImage>
          <Ionicons name={'ios-repeat-outline'} size={15} />
        </OrderChangeImage>
      </OrderChangeContainer>
      <FlatList
        data={props?.Art}
        renderItem={ArtItem}
        keyExtractor={item => '' + item.id}
        numColumns={2}
      />
    </ScreenLayout>
  );
}
