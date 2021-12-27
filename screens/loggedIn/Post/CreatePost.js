import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {pxRatio} from '../../../utils/utils';
import {View, Text} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayOut';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useForm} from 'react-hook-form';
import {gql, useMutation} from '@apollo/client';
import ImagePicker from 'react-native-image-crop-picker';
import {ReactNativeFile} from 'apollo-upload-client/public';
import {useState} from 'react';
const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $post: String!
    $categoryId: Int!
    $images: [Upload]
  ) {
    createPost(
      title: $title
      post: $post
      categoryId: $categoryId
      images: $images
    ) {
      ok
    }
  }
`;

const HeaderContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
  margin-top: ${pxRatio(71, 'column')}px;
`;
const GoBackContainer = styled.TouchableOpacity``;

const HeaderTitle = styled.Text`
  margin-left: ${pxRatio(143, 'row')}px;
  font-weight: 700;
  font-size: 18px;
`;
const CompleteButton = styled.TouchableOpacity`
  margin-left: ${pxRatio(119, 'row')}px;
`;
const CompleteText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  color: rgba(103, 103, 103, 1);
`;
const TotalInputContainer = styled.View`
  margin-left: ${pxRatio(18, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
  margin-top: ${pxRatio(10, 'column')}px;
`;
const InfoInput = styled.TextInput`
  margin-top: ${pxRatio(20, 'column')}px;
  height: ${pxRatio(20, 'column')}px;
`;
const UploadImageContainer = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  justify-content: center;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-top: ${pxRatio(700, 'column')}px;
  width: ${pxRatio(85, 'row')}px;
  height: ${pxRatio(42, 'column')}px;
  border: 1px black;
  border-radius: 17px;
`;
const UploadImageText = styled.Text`
  font-size: 17px;
  font-weight: 400;
`;
export default function CreatePost(props) {
  const {getValues, setValue, register} = useForm();
  const [uploadedImage, setUploadedImage] = useState();
  useEffect(() => {
    register('title', {required: true});
    register('post', {required: true});
    register('categoryId', {required: true});
  });
  setValue('categoryId', props?.route?.params?.categoryId);
  const [createPost, {loading}] = useMutation(CREATE_POST_MUTATION);
  const onValid = () => {
    if (!loading) {
      createPost({
        variables: {
          ...getValues(),
        },
      }).then(() => console.log('Uploaded'));
    }
  };
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
        setUploadedImage(image.map(img => img.sourceURL));
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
  return (
    <ScreenLayout>
      <HeaderContainer>
        <GoBackContainer onPress={() => props.navigation.goBack()}>
          <Ionicons name={'arrow-back'} size={25} />
        </GoBackContainer>
        <HeaderTitle>글 작성</HeaderTitle>
        <CompleteButton onPress={() => onValid()}>
          <CompleteText>완료</CompleteText>
        </CompleteButton>
      </HeaderContainer>
      <TotalInputContainer>
        <InfoInput
          placeholder={'제목을 작성해주세요'}
          onChangeText={text => setValue('title', text)}
        />
        <InfoInput
          placeholder={'내용을 입력해주세요'}
          onChangeText={text => setValue('post', text)}
        />
        <UploadImageContainer onPress={() => imagePick()}>
          <UploadImageText>사진 등록</UploadImageText>
        </UploadImageContainer>
      </TotalInputContainer>
    </ScreenLayout>
  );
}
