import styled from 'styled-components/native';
import {Text} from 'react-native';
import React from 'react';
import {pxRatio} from '../utils/utils';

const LogoText = styled.Text`
  font-weight: 700;
  font-size: ${pxRatio(31, 'row')};
`;
export default function Logo() {
  return <LogoText>TART</LogoText>;
}
