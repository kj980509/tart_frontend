import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: darkgoldenrod;
  padding: 15px 10px;
  border-radius: 3px;
  width: 100%;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

export default function AuthButton({onPress, disabled, text, loading}) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}