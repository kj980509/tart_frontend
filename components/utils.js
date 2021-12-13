import React from 'react';
import styled from 'styled-components/native';
import {pxRatio} from '../utils/utils';
import {Image, TouchableOpacity} from 'react-native';
const goBackIcon = require('../asset/goBackIcon.png');

//현재 상태를 나타내는 버튼밑의 밑줄들의 기본 사이즈 및 기본 디자인
export const UnderLine = styled.View`
  border: 1.5px solid rgba(255, 199, 0, 0.71);
  height: 0px;
  border-radius: 2px;
  width: ${pxRatio(40, 'row')}px;
  margin-top: 0.3px;
`;

const LogoText = styled.Text`
  font-weight: 700;
  font-size: ${pxRatio(31, 'row')};
`;
export function Logo() {
  return <LogoText>TART</LogoText>;
}

const HeaderContainer = styled.View`
  border-bottom-color: rgb(180, 173, 173);
  border-bottom-width: 1px;
  align-items: center;
  margin-top: ${pxRatio(73, 'column')}px;
  height: ${pxRatio(37, 'column')}px;
  flex-direction: row;
`;
const GoBackContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: ${pxRatio(18, 'row')}px;
  margin-bottom: ${pxRatio(14, 'column')}px;
  width: ${pxRatio(20, 'row')}px;
  height: ${pxRatio(20, 'column')}px;
`;
const HeaderText = styled.Text`
  margin-bottom: ${pxRatio(14, 'column')}px;
  margin-left: ${pxRatio(132, 'row')}px;
  font-size: 18px;
  font-weight: 600;
`;

export function Header(props) {
  return (
    <HeaderContainer>
      <GoBackContainer onPress={() => props.navigation.goBack()}>
        <Image source={goBackIcon} />
      </GoBackContainer>
      <HeaderText>{props.text}</HeaderText>
    </HeaderContainer>
  );
}
