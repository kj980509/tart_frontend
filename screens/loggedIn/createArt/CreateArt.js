import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {pxRatio} from '../../../utils/utils';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import {Header} from '../../../components/utils';
import ImagePicker from 'react-native-image-crop-picker';
import {useState} from 'react';
import ScreenLayout from '../../../components/ScreenLayOut';
import {useMutation, gql} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {logUserIn} from '../../../apollo';
import {ReactNativeFile} from 'apollo-upload-client';
const CREATE_ART_MUTATION = gql`
  mutation (
    $title: String!
    $category: String!
    $images: [Upload]!
    $basePrice: Int!
    $explain: String!
  ) {
    createArt(
      title: $title
      category: $category
      images: $images
      basePrice: $basePrice
      explain: $explain
    ) {
      ok
    }
  }
`;
const uploadImageIcon = require('../../../asset/uploadImageIcon.png');
const goFrontIcon = require('../../../asset/goFrontIcon.png');
const ImageUploadContainer = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-top: ${pxRatio(31, 'column')}px;
  width: ${pxRatio(90, 'row')}px;
  height: ${pxRatio(90, 'column')}px;
  border: 1px solid #c4c4c4;
  border-radius: 12px;
`;
const UploadImage = styled.Image`
  width: ${pxRatio(32, 'column')}px;
  height: ${pxRatio(32, 'column')}px;
  margin-top: ${pxRatio(14, 'column')}px;
`;
const UploadImageNumber = styled.Text`
  margin-top: ${pxRatio(12, 'column')}px;
  font-weight: 600;
  font-size: 14px;
  color: rgba(196, 196, 196, 1);
`;
const InfoInput = styled.TextInput`
  margin-top: ${pxRatio(44, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  width: ${pxRatio(378, 'row')}px;
  height: ${pxRatio(40, 'column')}px;
  font-size: 18px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(229, 229, 229, 1);
`;

const SelectCategoryContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: ${pxRatio(40, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  width: ${pxRatio(378, 'row')}px;
  height: ${pxRatio(40, 'column')}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(229, 229, 229, 1);
  align-items: center;
`;
const SelectCategoryText = styled.Text`
  font-weight: 500;
  font-size: 18px;
`;
const SelectCategoryImage = styled.Image`
  margin-left: ${pxRatio(283, 'row')};
`;
const Photo = styled.Image`
  width: ${pxRatio(200, 'row')}px;
  height: ${pxRatio(200, 'column')}px;
`;
const CompleteButton = styled.TouchableOpacity`
  background-color: rgba(255, 199, 0, 0.71);
  margin-top: ${pxRatio(315, 'column')}px;
  width: 100%;
  height: ${pxRatio(90, 'column')}px;
  align-items: center;
`;
const CompleteText = styled.Text`
  margin-top: ${pxRatio(20, 'column')}px;
  font-weight: 700;
  font-size: 20px;
`;
export default function CreateArt({navigation}) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [uploadedImages, setUploadedImage] = useState();
  const routes = navigation.getState().routes;
  const {register, setValue, getValues} = useForm();
  const onCompleted = async data => {
    const {
      createArt: {ok, token, error},
    } = data;
    if (ok) {
      console.log('Uploaded');
    } else {
      console.log(error);
    }
  };
  const [createArt, {loading}] = useMutation(CREATE_ART_MUTATION, {
    onCompleted,
  });
  useEffect(() => {
    register('title', {
      required: true,
    });
    register('category', {
      required: true,
    });
    register('basePrice', {
      required: true,
    });
    register('explain', {
      required: true,
    });
    register('images', {
      required: true,
    });
  }, [register]);
  useEffect(() => {
    routes.map(route =>
      route.name === 'CreateArt'
        ? setSelectedCategory(route.params?.category) &
          setValue('category', selectedCategory)
        : null,
    );
  });
  const imagePick = async () => {
    ImagePicker.openPicker({
      multiple: true,
      width: 378,
      height: 378,
      cropping: true,
      minFiles: 1,
      maxFiles: 5,
      includeBase64: true,
    })
      .then(image => {
        setValue(
          'images',
          image.map(
            img =>
              new ReactNativeFile({
                uri: img.sourceURL,
                name: img.filename,
                type: img.mime,
              }),
          ),
        );
      })
      .catch(e => {
        console.log(e);
      });
  };
  function onValid() {
    if (!loading) {
      createArt({
        variables: {
          ...getValues(),
        },
      })
        .then(() => console.log('Uploaded'))
        .catch(e => console.log(e));
    }
  }
  return (
    <ScreenLayout>
      <Header text="작품 등록" navigation={navigation} />
      <ImageUploadContainer onPress={() => imagePick()}>
        <UploadImage source={uploadImageIcon} />
        <UploadImageNumber>0/10</UploadImageNumber>
      </ImageUploadContainer>
      <InfoInput
        placeholder={'작품명'}
        onChangeText={text => setValue('title', text)}
      />
      <SelectCategoryContainer
        onPress={() => navigation.navigate('SelectCategory')}>
        <SelectCategoryText>
          {selectedCategory ? selectedCategory : '카테고리'}
        </SelectCategoryText>
        <SelectCategoryImage source={goFrontIcon} />
      </SelectCategoryContainer>
      <InfoInput
        placeholder={'$ 최소가격'}
        keyboardType="numeric"
        onChangeText={text => setValue('basePrice', parseInt(text))}
      />
      <InfoInput
        placeholder={'작품 설명'}
        multiline={true}
        onChangeText={text => setValue('explain', text)}
      />
      <CompleteButton onPress={() => onValid()}>
        <CompleteText>등록 완료</CompleteText>
      </CompleteButton>
    </ScreenLayout>
  );
}
