import React from 'react';
import {ART_FRAGMENT} from '../../../components/fragments/fragments';
import {gql, useLazyQuery} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {useEffect} from 'react';
import ScreenLayout from '../../../components/ScreenLayOut';
import styled from 'styled-components/native';
import {pxRatio} from '../../../utils/utils';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ART_SEARCH_QUERY = gql`
  query artSearch($keyword: String!) {
    artSearch(keyword: $keyword) {
      ...ArtFragment
      user {
        id
        userName
      }
    }
  }
  ${ART_FRAGMENT}
`;
const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${pxRatio(60, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
  height: ${pxRatio(50, 'column')}px;
`;
const SearchBar = styled.View`
  align-items: center;
  flex-direction: row;
  background-color: rgba(210, 203, 203, 0.6);
  height: 100%;
  width: ${pxRatio(348, 'row')}px;
  border-radius: 20px;
`;
const SearchInput = styled.TextInput`
  width: ${pxRatio(250, 'row')}px;
  height: 100%;
  margin-left: ${pxRatio(20, 'row')}px;
`;
const ButtonContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${pxRatio(32, 'row')}px;
  height: ${pxRatio(32, 'column')}px;
`;

export default function ArtSearch({navigation}) {
  const {setValue, register, handleSubmit} = useForm();
  const [startQueryFn, {loading, data, called}] =
    useLazyQuery(ART_SEARCH_QUERY);

  const onValid = ({keyword}) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  useEffect(() => {
    register('keyword', {
      required: true,
    });
  }, [register]);
  if (!loading) {
    console.log(data);
  }
  return (
    <HeaderContainer>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name={'arrow-back'} size={30} />
      </TouchableOpacity>
      <SearchBar>
        <SearchInput
          ref={input => {
            this.textInput = input;
          }}
          onChangeText={text => setValue('keyword', text)}
          onSubmitEditing={handleSubmit(onValid)}
        />
        <ButtonContainer onPress={() => this.textInput.clear()}>
          <Ionicons name={'close-circle-outline'} size={30} color={'grey'} />
        </ButtonContainer>
        <ButtonContainer onPress={handleSubmit(onValid)}>
          <Ionicons name={'search-outline'} size={30} color={'grey'} />
        </ButtonContainer>
      </SearchBar>
    </HeaderContainer>
  );
}
