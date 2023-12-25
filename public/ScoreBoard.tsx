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
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ScoreTitles from './ScoreTitles';
import RoundScoreDisplay from './RoundScoreDisplay';
import Prompt from './Prompt';
import ScoreBoxes from './ScoreBoxes';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const ScoreBoard = (props) => {
  const [score1, setScore1] = useMMKVStorage<number>('score1', storage, 0)
  const [score2, setScore2] = useMMKVStorage<number>('score2', storage, 0)
  const [roundScore1, setRoundScore1] = useMMKVStorage<number[]>('roundScore1', storage, [])
  const [roundScore2, setRoundScore2] = useMMKVStorage<number[]>('roundScore2', storage, [])

  const [screenLocked, setScreenLocked] = useState<boolean>(false)

  const pointFor1 = () => score2 == 0 && score1 < 4 && setScore1(score1 + 1)
  const pointFor2 = () => score1 == 0 && score2 < 4 && setScore2(score2 + 1)

  const minusPointFor1 = () => score1 > 0 && setScore1(score1 - 1)
  const minusPointFor2 = () => score2 > 0 && setScore2(score2 - 1)

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
    <View style={styles.background}>
      <TouchableOpacity style={styles.endRoundButton} onPress={() => !screenLocked && confirmReset()}>
        <Text style={styles.endRoundButtonText}>RESET GAME</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.moveToLineUp} onPress={() => props.pagerViewRef.current.setPage(1)}>
        <Text style={styles.moveToLineUpText}>{"LINEUP =>"}</Text>
      </TouchableOpacity>
      <ScoreTitles />
      <ScoreBoxes
        score1={score1}
        score2={score2}
        pointFor1={pointFor1}
        minusPointFor1={minusPointFor1}
        pointFor2={pointFor2}
        minusPointFor2={minusPointFor2}
        screenLocked={screenLocked}
      />
      <RoundScoreDisplay roundScore1={roundScore1} roundScore2={roundScore2}/>
      <View style={styles.resetButtonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={() => !screenLocked && confirmNextRound()}>
          <Text style={styles.resetButtonText}>SAVE ROUND</Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={() => setScreenLocked(!screenLocked)}>
        <View style={styles.lockSection}>
          {screenLocked
            ? <Image style={styles.lock} source={require('./locked.png')}/>
            : <Image style={styles.lock} source={require('./unlocked.png')}/>
          }
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000500"
  },
  endRoundButton: {
    backgroundColor: "#fdda00",
    width: "75%",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#000500",
    borderRightStyle: "solid",
  },
  endRoundButtonText: {
    color: "#000500",
  },
  moveToLineUp: {
    width: "25%",
    height: 40,
    backgroundColor: "yellow",
    position: "absolute",
    right: 0,
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  moveToLineUpText: {
  },
  resetButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  resetButton: {
    width: 120,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#fdda00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  resetButtonText: {
    color: "#000500"
  },
  lockSection: {
    position: "absolute",
    bottom: 5,
    right: 5
  },
  lock: {
    width: 25,
    height: 25
  },
});

export default ScoreBoard;