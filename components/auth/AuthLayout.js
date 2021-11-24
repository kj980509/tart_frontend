import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
  Platform,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
} from 'react-native';
import styled from 'styled-components/native';
import MonthPicker from 'react-native-month-year-picker';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 0px 20px;
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
