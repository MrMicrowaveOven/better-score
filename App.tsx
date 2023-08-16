/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import RoundScoreDisplay from './RoundScoreDisplay';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [roundScore1, setRoundScore1] = useState([])
  const [roundScore2, setRoundScore2] = useState([])
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const pointFor1 = () => setScore1(score1 + 1)
  const pointFor2 = () => setScore2(score2 + 1)

  const nextRound = () => {
    const previousScore1 : Number[] = roundScore1
    previousScore1.push(score1)
    setRoundScore1(previousScore1)
    setScore1(0)
    const previousScore2 = roundScore2
    previousScore2.push(score2)
    setRoundScore2(previousScore2)
    setScore2(0)
  }

  const confirmNextRound = () => {
    Alert.alert("Confirmation",
      "Are you sure you want to score this round?",[
      {
        text: "No",
        onPress: () => {}
      },
      {
        text: "Yes",
        onPress: () => nextRound()
      }
    ])
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button title="End Round" onPress={() => confirmNextRound()}/>
      <View style={styles.scoreTitles}>
        <Text style={styles.scoreTitle}>Team 1</Text>
        <Text style={styles.scoreTitle}>Team 2</Text>
      </View>
      <TouchableHighlight onPress={pointFor1}>
        <View style={[styles.scoreBox, styles.scoreBox1]}>
          <Text style={styles.scoreDisplay}>{score1}</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={pointFor2}>
        <View style={[styles.scoreBox, styles.scoreBox2]}>
            <Text style={styles.scoreDisplay}>{score2}</Text>
        </View>
      </TouchableHighlight>
      <RoundScoreDisplay roundScore1={roundScore1} roundScore2={roundScore2}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scoreTitles: {
    width: "100%",
    position: "absolute",
    top: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  scoreTitle: {
    fontSize: 25,
    color: "black"
  },
  scoreDisplay: {
    fontSize: 60,
    fontWeight: "500",
    color: "black"
  },
  scoreBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreBox1: {
    position: "absolute",
    left: 0,
    top: 100,
    width: "50%",
    height: 150,
    backgroundColor: "green",
    zIndex: 100
  },
  scoreBox2: {
    position: "absolute",
    right: 0,
    top: 100,
    width: "50%",
    height: 150,
    backgroundColor: "red",
    zIndex: 100
  },
});

export default App;