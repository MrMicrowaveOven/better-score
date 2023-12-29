import React, { forwardRef, useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ScoreBoard from './public/components/ScoreBoard';
import LineUp from './public/components/LineUp'
import PagerView from 'react-native-pager-view';

const App = () => {
  const pagerViewRef = useRef(null);

  const ScoreBoardComponent = forwardRef((props, pagerViewRef) => (
    <ScoreBoard pagerViewRef={pagerViewRef}/>
  ))

  const LineUpComponent = forwardRef((props, pagerViewRef) => (
    <LineUp pagerViewRef={pagerViewRef}/>
  ))

  return (
    <PagerView style={styles.pagerView} initialPage={0} ref={pagerViewRef}>
      <View key="1">
        <ScoreBoardComponent ref={pagerViewRef}/>
      </View>
      <View key="2">
        <LineUpComponent ref={pagerViewRef}/>
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