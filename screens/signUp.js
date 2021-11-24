import React, {useRef, useEffect} from 'react';
import {Button, TextInput, View} from 'react-native';
import {gql, useMutation} from '@apollo/client';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import {Auth} from 'aws-amplify';
import {useForm} from 'react-hook-form';
import styled from 'styled-components/native';
import {logUserIn} from '../apollo';
import {pxRatio} from '../utils/utils';
const TotalContainer = styled.View`
  align-items: center;
  flex: 1;
  background-color: white;
`;
const SIGNUP = gql`
  mutation signUp(
    $userName: String!
    $email: String!
    $gender: String!
    $birth: Int!
  ) {
    signUp(userName: $userName, email: $email, gender: $gender, birth: $birth) {
      ok
      token
      error
    }
  }
`;
const GenderView = styled.View`
  flex-direction: row;
  width: ${pxRatio(120, 'row')}px;
  height: ${pxRatio(40, 'column')}px;
`;
const MaleButton = styled.TouchableOpacity`
  flex: 1;
  background-color: darkgoldenrod;
  border-radius: 12px;
`;
const FemaleButton = styled.TouchableOpacity`
  flex: 1;
  background-color: blue;
  border-radius: 12px;
`;
export default function SignUp({navigation}) {
  const email = navigation.getState().routes[0].params.email;
  console.log(email);
  const {register, handleSubmit, setValue} = useForm();
  setValue('email', email);
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
  const [signUp, {loading}] = useMutation(SIGNUP, {
    onCompleted,
  });
  const onValid = data => {
    if (!loading) {
      signUp({
        variables: {
          ...data,
        },
      })
        .then(data => console.log('Success'))
        .catch(e => console.log(e));
    }
  };
  return (
    <TotalContainer>
      <AuthLayout>
        <TextInput
          placeholder={'UserName'}
          onChangeText={text => setValue('userName', text)}
          returnKeyType="done"
        />
        <GenderView>
          <MaleButton onPress={() => setValue('gender', 'M')} />
          <FemaleButton onPress={() => setValue('gender', 'F')} />
        </GenderView>
        <TextInput
          placeholder={'Birth'}
          onChangeText={text => setValue('birth', parseInt(text))}
          onSubmitEditing={handleSubmit(onValid)}
        />
        <AuthButton
          text="Create Account"
          disabled={false}
          onPress={handleSubmit(onValid)}
        />
        <View style={{marginTop: 200}}>
          <Button
            title="Sign Out"
            onPress={() => Auth.signOut({global: true})}
          />
          <Button
            title="Go to Login Page"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </AuthLayout>
    </TotalContainer>
  );
}
