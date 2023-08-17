import React from 'react';
import { SafeAreaView } from 'react-native';
import ScoreBoard from './public/ScoreBoard';
import LineUp from './public/LineUp'

const App = () => {
  return (
    <SafeAreaView>
      <ScoreBoard />
      {/* <LineUp /> */}
    </SafeAreaView>
  )
}

export default App;