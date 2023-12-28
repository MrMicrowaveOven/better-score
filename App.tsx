import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ScoreBoard from './public/components/ScoreBoard';
import LineUp from './public/components/LineUp'
import PagerView from 'react-native-pager-view';

const App = () => {
  const pagerViewRef = useRef(null);
  return (
    <PagerView style={styles.pagerView} initialPage={0} ref={pagerViewRef}>
      <View key="1">
        <ScoreBoard pagerViewRef={pagerViewRef}/>
      </View>
      <View key="2">
        <LineUp pagerViewRef={pagerViewRef}/>
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