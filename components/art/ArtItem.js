import React from 'react';
import styled from 'styled-components/native';
import {pxRatio} from '../../utils/utils';
import ScreenLayout from '../ScreenLayOut';
import {useNavigation} from '@react-navigation/native';

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
