import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SectionList,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import {gql, useQuery} from '@apollo/client';
import Banner from './Banner';
import {pxRatio} from '../../../utils/utils';
import {ART_FRAGMENT} from '../../../components/fragments/fragments';
import ScreenLayout from '../../../components/ScreenLayOut';
import {Logo} from '../../../components/utils';
import {UnderLine} from '../../../components/utils';
import HomeRenderItem from './HomeRenderItem';

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
// Style: Total Header Container
const TotalHeaderContainer = styled.View`
  flex-direction: row;
  margin-top: ${pxRatio(65, 'column')}px;
  align-items: center;
  margin-bottom: ${pxRatio(19, 'column')}px;
`;
// Style: Left Header Container
const LeftHeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${pxRatio(18, 'row')}px;
  width: ${pxRatio(84.11, 'row')}px;
  height: ${pxRatio(28.4, 'column')}px;
`;
// Style: Right Header
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
// Style: Category Bar
const CategoryContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${pxRatio(24, 'row')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
`;

const CategoryButton = styled.TouchableOpacity`
  flex: 1;
  width: ${pxRatio(38, 'row')}px;
`;
const CategoryName = styled.Text`
  font-size: ${pxRatio(18, 'row')}px;
  font-weight: 600;
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
  const seeTotalArt_data = [{data: [{Art: data?.seeTotalArt}]}];
  const [categoryId, setCategoryId] = useState(0);
  useEffect(() => {
    refetch();
  }, [refetch, categoryId]);
  const {data, loading, refetch, fetchMore} = useQuery(SEE_TOTAL_ART_QUERY, {
    variables: {
      take: 4,
      offset: 0,
      categoryId: categoryId,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const CategoryBar = () => {
    return (
      <CategoryContainer>
        <CategoryButton onPress={() => setCategoryId(1)}>
          <CategoryName>전체</CategoryName>
          {categoryId === 1 ? <UnderLine /> : null}
        </CategoryButton>
        <CategoryButton onPress={() => setCategoryId(2)}>
          <CategoryName>미술</CategoryName>
          {categoryId === 2 ? <UnderLine /> : null}
        </CategoryButton>
        <CategoryButton onPress={() => setCategoryId(3)}>
          <CategoryName>의류</CategoryName>
          {categoryId === 3 ? <UnderLine /> : null}
        </CategoryButton>
        <CategoryButton onPress={() => setCategoryId(4)}>
          <CategoryName>공예품</CategoryName>
          {categoryId === 4 ? <UnderLine /> : null}
        </CategoryButton>
        <CategoryButton onPress={() => setCategoryId(5)}>
          <CategoryName>기타</CategoryName>
          {categoryId === 5 ? <UnderLine /> : null}
        </CategoryButton>
      </CategoryContainer>
    );
  };
  return (
    <ScreenLayout loading={loading}>
      <TotalHeaderContainer>
        <LeftHeaderContainer>
          <Logo />
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <SearchButton onPress={() => navigation.navigate('Notice')}>
            <Image source={SearchIcon} />
          </SearchButton>
          <NoticeButton onPress={() => navigation.navigate('Notice')}>
            <Image source={NoticeIcon} />
          </NoticeButton>
        </RightHeaderContainer>
      </TotalHeaderContainer>
      <Banner />
      <AuctionTitleContainer>
        <AuctionTitle>경매 작품</AuctionTitle>
      </AuctionTitleContainer>
      {data?.seeTotalArt ? (
        <SectionList
          ListHeaderComponent={<View style={{alignItems: 'center'}} />}
          sections={seeTotalArt_data}
          //sections:item
          renderItem={({item: Art}) => <HomeRenderItem {...Art} />}
          keyExtractor={item => '' + item.id}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          onRefresh={refresh}
          renderSectionHeader={() => <CategoryBar />}
          onEndReachedThreshold={0.2}
          onEndReached={() =>
            fetchMore({
              variables: {
                offset: data?.seeTotalArt?.length,
              },
            })
          }
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center'}}>
          <CategoryBar />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 25}}>게시물이 존재하지 않습니다.</Text>
          </View>
        </View>
      )}
    </ScreenLayout>
  );
}