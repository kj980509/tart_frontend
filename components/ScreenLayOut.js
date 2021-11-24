import React from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';

export default function ScreenLayout({loading, children}) {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
      }}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={50} color="gray" />
        </View>
      ) : (
        children
      )}
    </View>
  );
}
