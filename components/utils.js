import React from 'react';
import styled from 'styled-components/native';
import {pxRatio} from '../utils/utils';

//현재 상태를 나타내는 버튼밑의 밑줄들의 기본 사이즈 및 기본 디자인
export const UnderLine = styled.View`
  border: 1.5px solid rgba(255, 199, 0, 0.71);
  height: 0px;
  border-radius: 2px;
  width: 100%;
  margin-top: 0.3px;
`;

const LogoText = styled.Text`
  font-weight: 700;
  font-size: ${pxRatio(31, 'row')};
`;
export function Logo() {
  return <LogoText>TART</LogoText>;
}
