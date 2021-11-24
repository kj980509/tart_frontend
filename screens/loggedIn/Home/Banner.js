import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-web-swiper';
import ScreenLayout from '../../../components/ScreenLayOut';
import {pxRatio} from '../../../utils/utils';

const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 11px;
  resize-mode: contain;
  background-color: saddlebrown;
`;

const Container = styled.View`
  height: ${pxRatio(175, 'column')}px;
  width: ${pxRatio(380, 'row')}px;
  margin-left: ${pxRatio(18, 'row')}px;
`;

export default function Banner() {
  return (
    <Container>
      <ScreenLayout>
        <Swiper controlsEnabled={false} loop timeout={30}>
          <TouchableOpacity>
            <Photo />
          </TouchableOpacity>
          <TouchableOpacity>
            <Photo />
          </TouchableOpacity>
          <TouchableOpacity>
            <Photo />
          </TouchableOpacity>
        </Swiper>
      </ScreenLayout>
    </Container>
  );
}
