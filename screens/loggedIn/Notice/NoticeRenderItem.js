import React from 'react';
import styled from 'styled-components/native';
import {pxRatio} from '../../../utils/utils';
import {FlatList, Text, Image} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayOut';
const NoticeIcon = require('../../../asset/NoticeIcon.png');
const TotalNoticeContainer = styled.View`
  margin-top: ${pxRatio(10, 'column')}px;
`;

const NoticeContainer = styled.View`
  border-top-color: #d0c8c8;
  border-top-width: 1px;
  flex-direction: row;
  height: ${pxRatio(132, 'column')}px;
`;
const NoticeIconContainer = styled.View`
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #000000;
  margin-top: ${pxRatio(45, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  width: ${pxRatio(38, 'row')}px;
  height: ${pxRatio(38, 'row')}px;
  border-radius: ${pxRatio(38, 'row')}px;
`;
const NoticeTextContainer = styled.View`
  width: ${pxRatio(234, 'row')}px;
  flex-direction: column;
  margin-top: ${pxRatio(40, 'column')}px;
  margin-left: ${pxRatio(20, 'row')};
`;
const NewNoticeText = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;
const NoticeText = styled.Text`
  margin-top: ${pxRatio(4, 'column')}px;
  font-weight: 500;
  font-size: 15px;
`;
const ArtPhotoContainer = styled.View`
  margin-top: ${pxRatio(40, 'column')}px;
  margin-left: ${pxRatio(30, 'row')}px;
  width: ${pxRatio(52, 'row')}px;
  height: ${pxRatio(52, 'row')}px;
`;
const ArtPhoto = styled.Image`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 13px;
`;

export default function NoticeRenderItem(props) {
  const NoticeItem = ({item: bid}) => {
    return (
      <NoticeContainer>
        <NoticeIconContainer>
          <Image source={NoticeIcon} />
        </NoticeIconContainer>
        <NoticeTextContainer>
          <NewNoticeText>새로운 알림</NewNoticeText>
          <NoticeText>
            {bid?.art?.title}작품이 {bid?.price}에 입찰 참여 되었습니다.
          </NoticeText>
        </NoticeTextContainer>
        <ArtPhotoContainer>
          <ArtPhoto source={{uri: bid?.art.photos[0].imageUrl}} />
        </ArtPhotoContainer>
      </NoticeContainer>
    );
  };
  const bids = props?.Bid?.map(art => art.bid).flat(1);
  return (
    <ScreenLayout>
      <TotalNoticeContainer>
        <FlatList data={bids} renderItem={NoticeItem} />
      </TotalNoticeContainer>
    </ScreenLayout>
  );
}
