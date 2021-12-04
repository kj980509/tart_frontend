import {pxRatio} from '../../utils/utils';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';

export default function ArtQuestions({questions}) {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      horizontal={false}>
      {questions?.map(question => (
        <View>
          <Text>{question.question}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
