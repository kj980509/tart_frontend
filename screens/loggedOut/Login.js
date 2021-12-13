import React, {useEffect, useState} from 'react';
import {Button, Text, View, Image} from 'react-native';
import Amplify from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import {urlOpener} from '../../utils/login';
import {Hub, Auth} from 'aws-amplify';
import {
  getProfile,
  KakaoOAuthToken,
  login,
} from '@react-native-seoul/kakao-login';
import styled from 'styled-components/native';
import {css} from 'styled-components/native';
import {pxRatio} from '../../utils/utils';
import SignUp from './signUp';
import {gql, useQuery} from '@apollo/client';
import {logUserIn} from '../../apollo';

const KakaoLogo = require('../../asset/kakaoLogo.png');
const FacebookLogo = require('../../asset/facebookLogo.png');
const GoogleLogo = require('../../asset/googleLogo.png');
Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

const IsSignedUpQuery = gql`
  query isSignedUp($email: String!) {
    isSignedUp(email: $email) {
      ok
      token
    }
  }
`;

const TotalContainer = styled.View`
  align-items: center;
  flex: 1;
  background-color: white;
`;
// Logo Styled
const LogoContainer = styled.View`
  justify-content: center;
  margin-top: ${pxRatio(245, 'column')}px;
  border: 3px solid white;
  border-bottom-color: black;
`;
const Logo = styled.Text`
  font-size: 70px;
  font-weight: 900;
`;
// Login Styled
const TotalLoginContainer = styled.View`
  justify-content: center;
  margin-top: ${pxRatio(121, 'column')}px;
`;
const LoginContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: ${pxRatio(343, 'row')}px;
  height: ${pxRatio(52, 'column')}px;
  align-items: center;
  border-radius: 12px;
  margin-bottom: ${pxRatio(16, 'column')}px;
  ${props => {
    if (props.theme === 'FaceBook') {
      return css`
        background-color: #315593;
      `;
    } else if (props.theme === 'Kakao') {
      return css`
        background-color: #f9e000;
      `;
    } else if (props.theme === 'Google') {
      return css`
        border: 3px solid black;
      `;
    }
  }};
`;
const LoginLogoContainer = styled.View`
  width: ${pxRatio(42, 'row')}px;
  height: ${pxRatio(42, 'row')}px;
  margin-left: ${pxRatio(10, 'row')}px;
`;
const LoginLogoImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;
const LoginTextContainer = styled.View`
  margin-left: ${pxRatio(20, 'row')}px;
`;
const LoginText = styled.Text`
  font-weight: 900;
  font-size: 14px;
`;

function Login({navigation}) {
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState();
  const {data, loading} = useQuery(IsSignedUpQuery, {
    variables: {
      email: mail,
    },
  });
  if (!loading & (data?.isSignedUp?.ok === true)) {
    logUserIn(data.isSignedUp.token);
  }
  useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setMail(userData.attributes.email));
          getUser().then(userData => setUser(userData));
          navigation.setParams({email: mail});
          break;
        case 'signOut':
          console.log('Sign Out');
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });
    getUser().then(userData => setUser(userData));
  }, [mail, navigation]);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }
  async function KakaoLogin() {
    const token: KakaoOAuthToken = await login();
    const profile = await getProfile();
    const kakaoEmail = profile.email;
    if (token) {
      setMail(kakaoEmail);
      navigation.setParams({email: kakaoEmail});
      return {authState: 'verifyContact', attributes: profile};
    }
  }
  return (
    <TotalContainer>
      {user ? (
        navigation.navigate('SignUp')
      ) : (
        <>
          <LogoContainer>
            <Logo>TART</Logo>
          </LogoContainer>
          <TotalLoginContainer>
            <LoginContainer
              onPress={() => Auth.federatedSignIn({provider: 'Google'})}
              theme="Google">
              <LoginLogoContainer>
                <LoginLogoImage source={GoogleLogo} resizeMode="stretch" />
              </LoginLogoContainer>
              <LoginTextContainer>
                <LoginText>Google 아이디로 로그인</LoginText>
              </LoginTextContainer>
            </LoginContainer>
            <LoginContainer
              onPress={() => Auth.federatedSignIn({provider: 'Facebook'})}
              theme="FaceBook">
              <LoginLogoContainer>
                <LoginLogoImage source={FacebookLogo} resizeMode="stretch" />
              </LoginLogoContainer>
              <LoginTextContainer>
                <LoginText>FaceBook 아이디로 로그인</LoginText>
              </LoginTextContainer>
            </LoginContainer>
            <LoginContainer
              onPress={() => KakaoLogin().then(userData => setUser(userData))}
              theme="Kakao">
              <LoginLogoContainer>
                <Image source={KakaoLogo} />
              </LoginLogoContainer>
              <LoginTextContainer>
                <LoginText>카카오 아이디로 로그인</LoginText>
              </LoginTextContainer>
            </LoginContainer>
          </TotalLoginContainer>
        </>
      )}
    </TotalContainer>
  );
}

export default Login;
