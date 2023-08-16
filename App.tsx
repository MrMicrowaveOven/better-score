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
  TouchableOpacity,
  View,
} from 'react-native';
import RoundScoreDisplay from './RoundScoreDisplay';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [team1Name, setTeam1Name] = useState("Team 1")
  const [team2Name, setTeam2Name] = useState("Team 2")
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [roundScore1, setRoundScore1] = useState([])
  const [roundScore2, setRoundScore2] = useState([])

  const pointFor1 = () => setScore1(score1 + 1)
  const pointFor2 = () => setScore2(score2 + 1)

  const minusPointFor1 = () => setScore1(score1 - 1)
  const minusPointFor2 = () => setScore2(score2 - 1)

  const nextRound = () => {
    const previousScore1 : number[] = [...roundScore1]
    previousScore1.push(score1)
    setRoundScore1(previousScore1)
    setScore1(0)
    const previousScore2 : number[]= [...roundScore2]
    previousScore2.push(score2)
    setRoundScore2(previousScore2)
    setScore2(0)
  }

  const confirmNextRound = () => {
    Alert.alert("Confirmation",
      "Are you sure you want to score this round?", [
        { text: "No", onPress: () => {} },
        { text: "Yes", onPress: () => nextRound() }
      ]
    )
  }

  const reset = () => {
    setScore1(0)
    setScore2(0)
    setRoundScore1([])
    setRoundScore2([])
  }

  const confirmReset = () => {
    Alert.alert("Confirmation",
      "Are you sure you want reset the game?",[
        { text: "No", onPress: () => {} },
        { text: "Yes", onPress: () => reset() }
      ]
    )
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.endRoundButton}>
        <Button title="Save Round Score" onPress={() => confirmNextRound()}/>
      </View>
      <View style={styles.scoreTitles}>
        <Text style={styles.scoreTitle}>{team1Name}</Text>
        <Text style={styles.scoreTitle}>{team2Name}</Text>
      </View>
      <View style={styles.scoreBoxes}>
        <TouchableOpacity style={[styles.scoreBox, styles.scoreBox1]} onPress={pointFor1}>
          <Text style={styles.scoreDisplay}>{score1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.scoreBox, styles.scoreBox2]} onPress={pointFor2}>
            <Text style={styles.scoreDisplay}>{score2}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.minusBoxes}>
        <TouchableOpacity
          onPress={() => score1 > 0 && minusPointFor1()}
          style={[styles.minusBox, styles.minusBox1]}
        >
          <Text style={styles.minusSymbol}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => score2 > 0 && minusPointFor2()}
          style={[styles.minusBox, styles.minusBox2]}
        >
          <Text style={styles.minusSymbol}>-</Text>
        </TouchableOpacity>
      </View>
      <RoundScoreDisplay roundScore1={roundScore1} roundScore2={roundScore2}/>
      <View style={styles.resetButton}>
        <Button title="Reset Game" onPress={() => confirmReset()}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(220,220,220,1)"
  },
  scoreTitles: {
    width: "100%",
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  scoreTitle: {
    fontSize: 25,
    color: "black",
    margin: 5
  },
  scoreDisplay: {
    fontSize: 60,
    fontWeight: "500",
    color: "black"
  },
  scoreBoxes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  scoreBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 150,
    zIndex: 100,
  },
  scoreBox1: {
    left: 0,
    backgroundColor: "green",
  },
  scoreBox2: {
    right: 0,
    backgroundColor: "red",
  },
  minusBoxes: {
    display: "flex",
    flexDirection: "row"
  },
  minusBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 47,
    width: "50%",
  },
  minusBox1: {
    left: 0,
    backgroundColor: "rgba(0,128,0,.5)"
  },
  minusBox2: {
    right: 0,
    backgroundColor: "rgba(255,0,0,.5)"
  },
  minusSymbol: {
    color: "black",
    textAlign: "center",
    fontSize: 30
  },
  endRoundButton: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-start",
  },
  resetButton: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  }
});

export default App;