import React, {useEffect, useState} from 'react';
import {View, Text, Image, SectionList} from 'react-native';
import styled from 'styled-components/native';
import {gql, useQuery, useSubscription} from '@apollo/client';
import Banner from './Banner';
import {pxRatio} from '../../../utils/utils';
import {ART_FRAGMENT} from '../../../components/fragments/fragments';
import ScreenLayout from '../../../components/ScreenLayOut';
import {Logo} from '../../../components/utils';
import {UnderLine} from '../../../components/utils';
import HomeRenderItem from './HomeRenderItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
const SearchIcon = require('../../../asset/SearchIcon.png');
const NoticeIcon = require('../../../asset/NoficeIcon.png');
const SEE_TOTAL_ART_QUERY = gql`
  query seeTotalArt($take: Int!, $offset: Int!, $categoryId: Int!) {
    seeTotalArt(take: $take, offset: $offset, categoryId: $categoryId) {
      ...ArtFragment
      user {
        userName
      }
      presentPrice
      minimumPrice
    }
  }
  ${ART_FRAGMENT}
`;
const SEE_ART_CATEGORY_QUERY = gql`
  query seeArtCategories {
    seeArtCategories {
      id
      category
    }
  }
`;
const BID_ALARM = gql`
  subscription bidAlarm {
    bidAlarm {
      user {
        userName
      }
    }
  }
`;

const TotalHeaderContainer = styled.View`
  position: absolute;
  flex-direction: row;
  margin-top: ${pxRatio(65, 'column')}px;
  align-items: center;
  margin-bottom: ${pxRatio(19, 'column')}px;
`;
const LeftHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${pxRatio(18, 'row')}px;
  width: ${pxRatio(84.11, 'row')}px;
  height: ${pxRatio(28.4, 'column')}px;
`;
const RightHeaderContainer = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  margin-left: ${pxRatio(232, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
`;
const SearchButton = styled.TouchableOpacity`
  flex: 1;
`;
const NoticeButton = styled.TouchableOpacity``;
const TabLabel = styled.Text`
  color: ${props =>
    props.focused ? 'rgba(0, 0, 0, 1)' : 'rgba(103, 103, 103, 1)'};
  font-size: 14px;
  font-weight: bold;
`;
const AuctionTitleContainer = styled.View`
  align-items: center;
  margin-top: ${pxRatio(19, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  width: ${pxRatio(77, 'row')}px;
`;
const AuctionTitle = styled.Text`
  font-weight: 700;
  font-size: ${pxRatio(20, 'row')}px;
`;

export default function Home({navigation}) {
  const [index, setIndex] = useState(0);
  const categoryId = index + 1;
  const [newNotice, setNewNotice] = useState(false);
  const bid_alarm = useSubscription(BID_ALARM);
  useEffect(() => {
    if (!bid_alarm?.loading) {
      setNewNotice(bid_alarm?.data);
    }
  }, [bid_alarm.loading, bid_alarm.data]);
  const seeArtCategories = useQuery(SEE_ART_CATEGORY_QUERY);
  const {data, loading, refetch, fetchMore} = useQuery(SEE_TOTAL_ART_QUERY, {
    variables: {
      take: 5,
      offset: 0,
      categoryId: categoryId,
    },
  });
  console.log(categoryId);
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const seeTotalArt_data = [{data: [{Art: data?.seeTotalArt}]}];
  console.log(data?.seeTotalArt?.length);
  const Arts = () => {
    return data?.seeTotalArt ? (
      <HomeRenderItem {...{Art: data?.seeTotalArt}} />
    ) : (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 25}}>게시물이 존재하지 않습니다.</Text>
        </View>
      </View>
    );
  };
  const routes = seeArtCategories?.data?.seeArtCategories?.map(data => ({
    key: data?.category,
    title: data?.category,
  }));
  const routeDict = {};
  seeArtCategories?.data?.seeArtCategories?.map(
    category => (routeDict[category.category] = Arts),
  );
  return (
    <ScreenLayout loading={loading}>
      <Banner />
      <TotalHeaderContainer>
        <LeftHeaderContainer>
          <Logo />
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <SearchButton
            onPress={() => navigation.navigate('ArtSearch')}
            onRefresh={refresh}>
            <Image source={SearchIcon} />
          </SearchButton>
          <NoticeButton
            onPress={() => navigation.navigate('Notice') & setNewNotice(null)}>
            <Image source={NoticeIcon} />
            {newNotice ? <UnderLine /> : null}
          </NoticeButton>
        </RightHeaderContainer>
      </TotalHeaderContainer>
      <AuctionTitleContainer>
        <AuctionTitle>경매 작품</AuctionTitle>
      </AuctionTitleContainer>
      <TabView
        onIndexChange={setIndex}
        navigationState={{index, routes}}
        renderScene={SceneMap(routeDict)}
        initialLayout={{height: 300}}
        style={{backgroundColor: 'grey', height: 300}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: 'rgb(0, 0, 1)',
              border: 'none',
            }}
            style={{
              backgroundColor: 'white',
              fontWeight: 'bold',
              shadowOffset: {height: 0, width: 0},
              shadowColor: 'transparent',
            }}
            pressColor={'transparent'}
            renderLabel={({route, focused}) => (
              <TabLabel focused={focused}>{route.title}</TabLabel>
            )}
          />
        )}
      />
    </ScreenLayout>
  );
}
