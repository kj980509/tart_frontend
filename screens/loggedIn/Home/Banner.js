import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import ScreenLayout from '../../../components/ScreenLayOut';
import {pxRatio} from '../../../utils/utils';
import {gql, useQuery} from '@apollo/client';

const BANNER_QUERY = gql`
  query seeBanner {
    seeBanner {
      imageUrl
    }
  }
`;
const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;

const BannerContainer = styled.View`
  height: ${pxRatio(293, 'column')}px;
  width: 100%;
`;

export default function Banner() {
  const {data, loading} = useQuery(BANNER_QUERY);
  return (
    <BannerContainer>
      <ScreenLayout loading={loading}>
        <Swiper controlsEnabled={false} loop timeout={30} showsButtons={true}>
          {data
            ? data?.seeBanner.map(banner => (
                <Photo source={{uri: banner.imageUrl}} />
              ))
            : null}
        </Swiper>
      </ScreenLayout>
    </BannerContainer>
  );
}
