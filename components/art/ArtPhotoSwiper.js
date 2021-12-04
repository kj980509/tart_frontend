import React from 'react';
import styled from 'styled-components/native';
import {pxRatio} from '../../utils/utils';
import {ScrollView} from 'react-native';

const ArtPhoto = styled.Image`
  flex: 1;
  width: ${pxRatio(378, 'row')}px;
  height: ${pxRatio(388, 'column')}px;
  border-radius: 13px;
`;
const PhotoView = styled.View`
  flex-direction: row;
  margin-left: ${pxRatio(18, 'row')};
  margin-right: ${pxRatio(18, 'row')};
  align-items: center;
`;

export default function ArtPhotoSwiper({photos}) {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      horizontal={true}>
      {photos?.map(art => (
        <PhotoView key={art?.id}>
          <ArtPhoto source={{uri: art?.imageUrl}} />
        </PhotoView>
      ))}
    </ScrollView>
  );
}
