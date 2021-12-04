import React from 'react';
import styled from 'styled-components/native';
import AuthLayout from '../../components/auth/AuthLayout';
import {Image} from 'react-native';
import {gql, useMutation} from '@apollo/client';
import {useState} from 'react';
import {pxRatio} from '../../utils/utils';
import {logUserIn} from '../../apollo';
const goBackIcon = require('../../asset/goBackIcon.png');
const passwordIcon = require('../../asset/passwordIcon.png');
const checkPasswordIcon = require('../../asset/checkPasswordIcon.png');

const SIGNUP = gql`
  mutation signUp(
    $userName: String!
    $email: String!
    $gender: String!
    $birth: Int!
    $password: String!
  ) {
    signUp(
      userName: $userName
      email: $email
      gender: $gender
      birth: $birth
      password: $password
    ) {
      ok
      token
      error
    }
  }
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  margin-top: ${pxRatio(78, 'column')}px;
  border-bottom-width: ${pxRatio(1, 'column')}px;
  border-bottom-color: #d3caca;
`;
const GoBackContainer = styled.TouchableOpacity`
  width: ${pxRatio(20, 'row')}px;
  height: ${pxRatio(20, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
`;
const HeaderText = styled.Text`
  margin-left: ${pxRatio(116, 'row')}px;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: ${pxRatio(13, 'column')}px;
`;
const PasswordExplain = styled.Text`
  font-weight: 500;
  font-size: 16px;
  margin-top: ${pxRatio(22, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  color: rgba(103, 103, 103, 1);
`;
const TitleContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-top: ${pxRatio(24, 'column')}px;
`;
const Title = styled.Text`
  margin-left: ${pxRatio(6, 'row')}px;
  font-weight: 500;
  font-size: 16px;
`;
const PasswordInput = styled.TextInput`
  height: ${pxRatio(48, 'column')}px;
  margin-top: ${pxRatio(10, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #dadada;
  text-align: center;
`;

const CompleteContainer = styled.TouchableOpacity`
  width: 100%;
  margin-top: ${pxRatio(470, 'column')}px;
  height: ${pxRatio(130, 'column')}px;
  background-color: rgba(255, 199, 0, 0.71);
  align-items: center;
`;
const CompleteText = styled.Text`
  margin-top: ${pxRatio(20, 'column')}px;
  font-weight: 700;
  font-size: 20px;
`;

export default function SetPassword({navigation}) {
  const variables = navigation.getState().routes[1].params;
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const [isValidPassword, setIsValidPassword] = useState();

  const onCompleted = async data => {
    const {
      signUp: {ok, token, error},
    } = data;
    if (ok) {
      await logUserIn(token);
    } else {
      console.log(error);
    }
  };
  const [signUp, {loading}] = useMutation(SIGNUP, {
    onCompleted,
  });
  function onValid() {
    if (password !== checkPassword) {
      return console.log('Wrong');
    }
    variables.password = password;
    if (!loading) {
      signUp({
        variables: {
          ...variables,
        },
      }).then(() => console.log('Singed Up!'));
    }
  }

  return (
    <AuthLayout>
      <HeaderContainer>
        <GoBackContainer onPress={() => navigation.goBack()}>
          <Image source={goBackIcon} resizeMode="stretch" />
        </GoBackContainer>
        <HeaderText>비밀번호 설정</HeaderText>
      </HeaderContainer>
      <PasswordExplain>
        * 작품 입찰 시 사용할 암호를 설정해 주세요.
      </PasswordExplain>
      <TitleContainer>
        <Image source={passwordIcon} />
        <Title>비밀번호 설정</Title>
      </TitleContainer>
      <PasswordInput
        onChangeText={password => setPassword(password)}
        secureTextEntry={true}
      />
      <TitleContainer>
        <Image source={checkPasswordIcon} />
        <Title>비밀번호 확인</Title>
      </TitleContainer>
      <PasswordInput
        onChangeText={checkPassword => setCheckPassword(checkPassword)}
        secureTextEntry={true}
      />
      <CompleteContainer onPress={() => onValid()}>
        <CompleteText>등록 완료</CompleteText>
      </CompleteContainer>
    </AuthLayout>
  );
}
