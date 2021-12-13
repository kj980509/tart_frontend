import React from 'react';
import styled from 'styled-components/native';
import {Text, TouchableOpacity, Image, SectionList} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {pxRatio} from '../../../utils/utils';
import {useState} from 'react';
import {css} from 'styled-components/native';
import NoticeRenderItem from './NoticeRenderItem';
import HomeRenderItem from '../Home/HomeRenderItem';
const goBackIcon = require('../../../asset/goBackIcon.png');

const NoticeContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const SEE_BIDS_QUERY = gql`
  query seeBids {
    seeBids {
      id
      bid {
        price
        userId
        art {
          title
          photos {
            imageUrl
          }
        }
      }
    }
  }
`;
const HeaderContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
  margin-top: ${pxRatio(68, 'column')}px;
  height: ${pxRatio(30, 'column')}px;
`;

const NoticeTypeBar = styled.View`
  flex-direction: row;
  width: ${pxRatio(114, 'row')}px;
  margin-left: ${pxRatio(127, 'row')}px;
`;
const NoticeType = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${props => {
    if (props.theme === true) {
      return css`
        background-color: black;
      `;
    }
  }};
`;

const NoticeText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  ${props => {
    if (props.theme === true) {
      return css`
        color: white;
      `;
    }
  }};
`;

export default function Notice({navigation}) {
  const [isBid, setIsBid] = useState(true);
  const [isMy, setIsMy] = useState(false);
  const {data, loading} = useQuery(SEE_BIDS_QUERY);
  const bidData = [{data: [{Bid: data?.seeBids}]}];
  const NoticeHeader = () => {
    return (
      <HeaderContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={goBackIcon} />
        </TouchableOpacity>
        <NoticeTypeBar>
          <NoticeType
            onPress={() => setIsBid(true) & setIsMy(false)}
            theme={isBid}>
            <NoticeText theme={isBid}>알림</NoticeText>
          </NoticeType>
          <NoticeType
            onPress={() => setIsBid(false) & setIsMy(true)}
            theme={isMy}>
            <NoticeText theme={isMy}>MY</NoticeText>
          </NoticeType>
        </NoticeTypeBar>
      </HeaderContainer>
    );
  };
  return (
    <SectionList
      stickySectionHeadersEnabled={true}
      showsVerticalScrollIndicator={false}
      renderSectionHeader={() => <NoticeHeader />}
      sections={bidData}
      renderItem={({item: bid}) => <NoticeRenderItem {...bid} />}
      keyExtractor={item => '' + item.id}
    />
  );
}
