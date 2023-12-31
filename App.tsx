import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ScoreBoard from './public/components/ScoreBoard';
import LineUp from './public/components/LineUp'
import Stats from "./public/components/Stats"
import PagerView from 'react-native-pager-view';

const App = () => {
  const pagerViewRef: any = useRef(null);

  const goToStats = () => {
    pagerViewRef?.current?.setPage(0)
  }

  const goToScoreBoard = () => {
    pagerViewRef?.current?.setPage(1)
  }

  const goToLineUp = () => {
    pagerViewRef?.current?.setPage(2)
  }

  const statsPage = true

  return (
    <PagerView style={styles.pagerView} initialPage={1} ref={pagerViewRef}>
      <View key="0">
        <Stats />
      </View>
      <View key="1">
        <ScoreBoard
          goToLineUp={goToLineUp}
          goToStats={goToStats}
          statsPage={statsPage}
        />
      </View>
      <View key="2">
        <LineUp
          goToScoreBoard={goToScoreBoard}
        />
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