import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {gql, useQuery} from '@apollo/client';
import {POST_FRAGMENT} from '../../../components/fragments/fragments';
import {View, Text} from 'react-native';
import {Header} from '../../../components/utils';
import ScreenLayout from '../../../components/ScreenLayOut';
import {pxRatio} from '../../../utils/utils';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

const SEE_TOTAL_POST_QUERY = gql`
  query seeTotalPost($categoryId: Int!) {
    seeTotalPost(categoryId: $categoryId) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
const SEE_POST_CATEGORIES_QUERY = gql`
  query seePostCategories {
    seePostCategories {
      category
      id
    }
  }
`;
const TabLabel = styled.Text`
  color: ${props =>
    props.focused ? 'rgba(0, 0, 0, 1)' : 'rgba(103, 103, 103, 1)'};
  font-size: 14px;
  font-weight: bold;
`;
const MorePostButton = styled.TouchableOpacity`
  margin-left: ${pxRatio(353, 'row')}px;
  margin-top: ${pxRatio(14, 'column')}px;
`;
const MorePostText = styled.Text`
  font-size: 15px;
  font-weight: 400;
`;
const TotalPostContainer = styled.View`
  width: ${pxRatio(400, 'row')}px;
  height: ${pxRatio(329, 'column')}px;
  margin-left: ${pxRatio(8, 'row')}px;
  margin-right: ${pxRatio(8, 'row')}px;
  margin-top: ${pxRatio(14, 'column')}px;
  border-width: 1px;
  border-radius: 10px;
  border-color: rgba(196, 196, 196, 1);
`;
const PostContainer = styled.TouchableOpacity`
  width: ${pxRatio(400, 'row')}px;
  height: ${pxRatio(83, 'column')}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(196, 196, 196, 1);
`;
const PostTitle = styled.Text`
  margin-left: ${pxRatio(15, 'row')}px;
  margin-top: ${pxRatio(9, 'column')}px;
  font-weight: 700;
  font-size: 17px;
`;
const PostContent = styled.Text`
  margin-top: ${pxRatio(4, 'column')}px;
  margin-left: ${pxRatio(15, 'row')}px;
  font-size: 15px;
  font-weight: 500;
`;
const PostCreatedTime = styled.Text`
  margin-left: ${pxRatio(16, 'row')}px;
  margin-top: ${pxRatio(5, 'column')}px;
  font-weight: 700;
  font-size: 13px;
`;
const CreatePostButton = styled.TouchableOpacity`
  background-color: #00008b;
  margin-top: ${pxRatio(10, 'column')}px;
  margin-left: ${pxRatio(9, 'row')}px;
`;
const CreatePostButtonText = styled.Text`
  margin-top: ${pxRatio(10, 'column')}px;
  font-size: 20px;
  font-weight: 500;
`;
export default function PostMain({navigation}) {
  const [posts, setPosts] = useState(null);
  const [index, setIndex] = useState(0);
  const seePostCategories = useQuery(SEE_POST_CATEGORIES_QUERY);
  const categoryId = index + 1;
  const seeTotalPost = useQuery(SEE_TOTAL_POST_QUERY, {
    variables: {
      categoryId,
    },
  });
  useEffect(() => {
    if (!seeTotalPost?.loading) {
      setPosts(seeTotalPost?.data?.seeTotalPost);
    }
  }, [seeTotalPost?.data, seeTotalPost?.loading]);
  const Posts = () => {
    return (
      <View>
        <MorePostButton>
          <MorePostText>더보기</MorePostText>
        </MorePostButton>
        <TotalPostContainer>
          {posts
            ? posts.map(post => (
                <PostContainer
                  onPress={() =>
                    navigation.navigate('PostDetail', {id: post?.id})
                  }>
                  <PostTitle>{post?.title}</PostTitle>
                  <PostContent>{post?.post}</PostContent>
                  <PostCreatedTime>
                    {((Date.now() - post?.createdAt) / 1000 / 60).toFixed(0)}
                    분전
                  </PostCreatedTime>
                </PostContainer>
              ))
            : null}
        </TotalPostContainer>
      </View>
    );
  };
  const routes = seePostCategories?.data?.seePostCategories?.map(data => ({
    key: data?.category,
    title: data?.category,
  }));
  const routeDict = {};
  seePostCategories?.data?.seePostCategories?.map(
    category => (routeDict[category.category] = Posts),
  );
  return (
    <ScreenLayout loading={seePostCategories?.loading}>
      <Header text={'커뮤니티'} navigation={navigation} />
      <TabView
        onIndexChange={setIndex}
        navigationState={{index, routes}}
        renderScene={SceneMap(routeDict)}
        initialLayout={{height: 300}}
        style={{height: 300}}
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
      <CreatePostButton
        onPress={() => navigation.navigate('CreatePost', {categoryId})}>
        <CreatePostButtonText>게시물 작성</CreatePostButtonText>
      </CreatePostButton>
    </ScreenLayout>
  );
}
