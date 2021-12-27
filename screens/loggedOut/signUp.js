import React, {useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import AuthLayout from '../../components/auth/AuthLayout';
import {useForm} from 'react-hook-form';
import styled from 'styled-components/native';
import {pxRatio} from '../../utils/utils';
import ScreenLayout from '../../components/ScreenLayOut';
import {css} from 'styled-components/native';
import {Text} from 'react-native';
const CheckUserName = gql`
  query checkUserName($userName: String!) {
    checkUserName(userName: $userName) {
      ok
      error
    }
  }
`;

const HeaderContainer = styled.View`
  align-items: center;
  margin-top: ${pxRatio(78, 'column')}px;
  border-bottom-width: ${pxRatio(1, 'column')}px;
  border-bottom-color: #d3caca;
`;
const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: ${pxRatio(13, 'column')}px;
`;

const TotalSignUpContainer = styled.View`
  flex-direction: column;
  margin-top: ${pxRatio(10, 'column')}px;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-right: ${pxRatio(18, 'row')}px;
  height: ${pxRatio(250, 'column')}px;
`;

const InfoContainer = styled.View`
  margin-top: ${pxRatio(20, 'column')}px;
`;

const InfoTitle = styled.Text`
  font-weight: 500;
  font-size: 16px;
`;

const UserNameTextInput = styled.TextInput`
  width: 100%;
  margin-top: ${pxRatio(10, 'column')}px;
  height: ${pxRatio(48, 'column')}px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #dadada;
  text-align: center;
`;

const BirthTextInputContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: ${pxRatio(10, 'column')}px;
`;

const BirthTextInput = styled.TextInput`
  width: ${pxRatio(113, 'row')}px;
  height: ${pxRatio(48, 'column')}px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #dadada;
  text-align: center;
`;
const BirthText = styled.Text`
  margin-left: ${pxRatio(5, 'row')}px;
  margin-top: ${pxRatio(29, 'column')}px;
  font-size: 16px;
  font-weight: 500;
`;

const GenderButtonContainer = styled.View`
  flex-direction: column;
  height: ${pxRatio(105, 'column')}px;
  width: 100%;
`;

const GenderButton = styled.TouchableOpacity`
  margin-top: ${pxRatio(10, 'column')}px;
  width: 100%;
  height: ${pxRatio(48, 'column')}px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #dadada;
  justify-content: center;
  ${props => {
    if (props.theme === true) {
      return css`
        background-color: #f7f4f4;
      `;
    }
  }}
`;
const GenderText = styled.Text`
  margin-left: ${pxRatio(24, 'row')}px;
  font-weight: 500;
  font-size: 16px;
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
export default function SignUp({navigation}) {
  const [userName, setUserName] = useState(null);
  const [male, setMale] = useState(null);
  const [female, setFemale] = useState(null);
  const [userNameValid, setUserNameValid] = useState(null);
  const {register, getValues, setValue} = useForm();
  console.log(navigation.getState().routes);
  const email = navigation.getState().routes[0].params.email;
  setValue('email', email);
  useEffect(() => {
    register('userName', {
      required: true,
    });
    register('email', {
      required: true,
    });
    register('gender', {
      required: true,
    });
    register('birth', {
      required: true,
    });
  }, [register]);
  const {loading, error, data} = useQuery(CheckUserName, {
    variables: {userName: userName},
  });
  function validUserName() {
    const isValid = data.checkUserName.ok;
    console.log(isValid);
    setUserNameValid(isValid);
    if (isValid === false) {
      return console.log('error');
    }
    navigation.setParams(getValues());
    navigation.navigate('SetPassword');
  }
  console.log(getValues());
  return (
    <ScreenLayout>
      <AuthLayout>
        <HeaderContainer>
          <HeaderText>정보등록</HeaderText>
        </HeaderContainer>
        <TotalSignUpContainer>
          <InfoContainer>
            <InfoTitle>닉네임</InfoTitle>
            <UserNameTextInput
              placeholder="닉네임"
              onChangeText={text =>
                setValue('userName', text) & setUserName(text)
              }
            />
            {userNameValid === false ? (
              <Text>이미 등록된 유저명입니다</Text>
            ) : null}
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>태어난 년도</InfoTitle>
            <BirthTextInputContainer>
              <BirthTextInput
                placeholder={'년도'}
                keyboardType="number-pad"
                onChangeText={text => setValue('birth', parseInt(text))}
              />
              <BirthText>년</BirthText>
            </BirthTextInputContainer>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>성별</InfoTitle>
            <GenderButtonContainer>
              <GenderButton
                onPress={() =>
                  setValue('gender', 'M') & setMale(true) & setFemale(false)
                }
                theme={male}>
                <GenderText>남</GenderText>
              </GenderButton>
              <GenderButton
                onPress={() =>
                  setValue('gender', 'F') & setFemale(true) & setMale(false)
                }
                theme={female}>
                <GenderText>녀</GenderText>
              </GenderButton>
            </GenderButtonContainer>
          </InfoContainer>
        </TotalSignUpContainer>
        <CompleteContainer onPress={() => validUserName()}>
          <CompleteText>입찰 시 비밀번호 설정</CompleteText>
        </CompleteContainer>
      </AuthLayout>
    </ScreenLayout>
  );
}
