import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
export default function AuthLayout({children}) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPrexx={dismissKeyboard}
      disabled={Platform.OS === 'web'}>
      <Container>
        <KeyboardAvoidingView
          style={{width: '100%'}}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
