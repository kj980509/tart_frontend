import React, {useEffect, useState} from 'react';
import {Button, Text, View, Image} from 'react-native';
import Amplify from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import {urlOpener} from '../utils/login';
import {Hub, Auth} from 'aws-amplify';
import {
  getProfile,
  KakaoOAuthToken,
  login,
} from '@react-native-seoul/kakao-login';
import styled from 'styled-components/native';
import {pxRatio} from '../utils/utils';
import SignUp from './signUp';

const KakaoLogo = require('../asset/kakaLogo.png');
const FacebookLogo = require('../asset/facebookLogo.png');
const GoogleLogo = require('../asset/googleLogo.png');

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

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
const LoginContainer = styled.View`
  justify-content: center;
  margin-top: ${pxRatio(121, 'column')}px;
`;
const GoogleLogin = styled.View`
  flex-direction: row;
  width: ${pxRatio(343, 'row')}px;
  height: ${pxRatio(52, 'column')}px;
  border: 3px solid black;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: ${pxRatio(16, 'column')}px;
`;
const FacebookLogin = styled.View`
  background-color: #315593;
  flex-direction: row;
  width: ${pxRatio(343, 'row')}px;
  height: ${pxRatio(52, 'column')}px;
  border: 3px solid #315593;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: ${pxRatio(16, 'column')}px;
`;
const KaKaoLogin = styled.View`
  background-color: #f9e000;
  flex-direction: row;
  width: ${pxRatio(343, 'row')}px;
  height: ${pxRatio(52, 'column')}px;
  border: 3px solid #f9e000;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: ${pxRatio(16, 'column')}px;
`;
function Login({navigation}) {
  const [user, setUser] = useState(null);
  const [mail, setMail] = useState(null);
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
      const kakaoUser = {authState: 'verifyContact', attributes: token};
      setUser(kakaoUser);
      setMail(kakaoEmail);
      console.log(kakaoEmail);
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
          <LoginContainer>
            <GoogleLogin>
              <Image source={GoogleLogo} />
              <Button
                color="black"
                title="GOOGLE 아이디로 로그인"
                onPress={() => Auth.federatedSignIn({provider: 'Google'})}
              />
            </GoogleLogin>
            <FacebookLogin>
              <Image source={FacebookLogo} />
              <Button
                title="FaceBook Sign In"
                color="black"
                onPress={() => Auth.federatedSignIn({provider: 'Facebook'})}
              />
            </FacebookLogin>
            <KaKaoLogin>
              <Image source={KakaoLogo} />
              <Button
                color="black"
                title="KaKao Login"
                onPress={() => KakaoLogin()}
              />
            </KaKaoLogin>
          </LoginContainer>
        </>
      )}
    </TotalContainer>
  );
}

export default Login;
