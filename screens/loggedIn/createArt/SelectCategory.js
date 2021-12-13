import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Header} from '../../../components/utils';
import {useQuery, gql} from '@apollo/client';
import {View, Text} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayOut';
import {ScrollView} from 'react-native-gesture-handler';
import {pxRatio} from '../../../utils/utils';
const SEE_CATEGORIES_QUERY = gql`
  query {
    seeCategories {
      name
      id
    }
  }
`;

const CategoryContainer = styled.TouchableOpacity`
  height: ${pxRatio(40, 'column')}px;
  margin-top: ${pxRatio(30, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(229, 229, 229, 1);
`;
const Category = styled.Text`
  margin-bottom: ${pxRatio(16, 'column')}px;
  font-size: 18px;
  font-weight: 500;
`;

export default function SelectCategory({navigation}) {
  const {data, loading} = useQuery(SEE_CATEGORIES_QUERY);
  const [selectedCategory, setSelectedCategory] = useState();
  const categories = data?.seeCategories?.map(Category => Category.name);
  return (
    <ScreenLayout loading={loading}>
      <Header text={'카테고리'} navigation={navigation} />
      {categories
        ? categories.map(category => (
            <CategoryContainer
              key={category}
              onPress={() =>
                setSelectedCategory(category) &
                navigation.navigate('CreateArt', {
                  category: category,
                })
              }>
              <Category key={category}>{category}</Category>
            </CategoryContainer>
          ))
        : null}
    </ScreenLayout>
  );
}
