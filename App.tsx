import React, { forwardRef, useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ScoreBoard from './public/components/ScoreBoard';
import LineUp from './public/components/LineUp'
import PagerView from 'react-native-pager-view';

const App = () => {
  const pagerViewRef: any = useRef(null);

  const goToScoreBoard = () => {
    pagerViewRef?.current?.setPage(0)
  }

  const goToLineUp = () => {
    pagerViewRef?.current?.setPage(1)
  }

  return (
    <PagerView style={styles.pagerView} initialPage={0} ref={pagerViewRef}>
      <View key="1">
        <ScoreBoard goToLineUp={goToLineUp} />
      </View>
      <View key="2">
        <LineUp goToScoreBoard={goToScoreBoard} />
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