import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ScoreBoard from './public/ScoreBoard';
import LineUp from './public/LineUp'
import PagerView from 'react-native-pager-view';

const App = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">
        <ScoreBoard />
      </View>
      <View key="2">
        <LineUp />
      </View>
    </PagerView>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export default App;