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
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ScoreTitles from './ScoreTitles';
import RoundScoreDisplay from './ScoreDisplay';
import ScoreBoxes from './ScoreBoxes';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();
import TopMenu from './TopMenu';
import CountDown from 'react-native-countdown-component';

type ScoreBoardProps = PropsWithChildren<{
  goToLineUp: Function;
  goToStats: Function;
  statsPage: boolean;
  saveHistory: Function;
}>;

const ScoreBoard = ({goToLineUp, goToStats, statsPage, saveHistory}: ScoreBoardProps) => {
  const [score1, setScore1] = useMMKVStorage<number>('score1', storage, 0)
  const [score2, setScore2] = useMMKVStorage<number>('score2', storage, 0)
  const [roundScore1, setRoundScore1] = useMMKVStorage<number[]>('roundScore1', storage, [])
  const [roundScore2, setRoundScore2] = useMMKVStorage<number[]>('roundScore2', storage, [])

  const [screenLocked, setScreenLocked] = useState<boolean>(false)

  const [timerId, setTimerId] = useMMKVStorage<number>('timerId', storage, Math.random())

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
    saveHistory({roundScore1: roundScore1, roundScore2: roundScore2})
    setScore1(0)
    setScore2(0)
    setRoundScore1([])
    setRoundScore2([])
    resetTimer()
  }

  const resetTimer = () => {
    setTimerId(Math.random)
  }

  const confirmReset = () => {
    Alert.alert("Confirmation",
      "Are you sure you want to reset the game?  This will also save the game in your Stats.",[
        { text: "No", onPress: () => {} },
        { text: "Yes", onPress: () => reset() }
      ]
    )
  }

  const confirmResetTimer = () => {
    Alert.alert("Confirmation",
      "Are you sure you want to reset the timer?",[
        { text: "No", onPress: () => {} },
        { text: "Yes", onPress: () => resetTimer() }
      ]
    )
  }

  const SaveRoundButton = () =>
    <View style={styles.nextRoundButtonContainer}>
      <TouchableOpacity style={styles.nextRoundButton} onPress={() => !screenLocked && confirmNextRound()}>
        <Text style={styles.nextRoundButtonText}>SAVE ROUND</Text>
      </TouchableOpacity>
    </View>

  const LockButton = () =>
    <TouchableWithoutFeedback onPress={() => setScreenLocked(!screenLocked)}>
      <View style={styles.lockSection}>
        {screenLocked
          ? <Image style={styles.lock} source={require('../images/locked.png')}/>
          : <Image style={styles.lock} source={require('../images/unlocked.png')}/>
        }
      </View>
    </TouchableWithoutFeedback>

  return (
    <SafeAreaView style={styles.background}>
      <TopMenu
        left={"STATS"}
        leftAction={() => goToStats()}
        center={"RESET GAME"}
        centerAction={() => !screenLocked && confirmReset()}
        right={"LINEUP"}
        rightAction={() => goToLineUp()}
      />
      <ScoreTitles screenLocked={screenLocked} />
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
      <View style={styles.timer}>
        <CountDown
          id={timerId}
          until={45 * 60}
          timeToShow={['M', 'S']}
          timeLabels={{m: null, s: null}}
          separatorStyle={{color: 'yellow', fontSize: 30}}
          showSeparator
          onPress={confirmResetTimer}
          onFinish={() => Alert.alert('Game Over!')}
        />
      </View>
      <SaveRoundButton />
      <LockButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000500",
    borderRightWidth: 1,
    borderRightColor: "#000500",
    borderRightStyle: "solid",
  },
  topMenu: {
    display: "flex",
    flexDirection: "row",
  },
  moveToStats: {
    width: "25%",
    height: 30,
    backgroundColor: "#fdda00",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRightColor: "#000500",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderBottomColor: "#000500",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
  },
  moveToStatsText: {
  },
  moveToStatsArrow: {
    width: 20,
    height: 20,
  },
  resetGameButton: {
    backgroundColor: "#fdda00",
    width: "50%",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#000500",
    borderRightStyle: "solid",
    borderBottomColor: "#000500",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
  },
  resetGameButtonText: {
    color: "#000500",
  },
  moveToLineUp: {
    width: "25%",
    height: 30,
    backgroundColor: "#fdda00",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRightColor: "#000500",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderBottomColor: "#000500",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
  },
  moveToLineUpText: {
  },
  moveToLineUpArrow: {
    width: 20,
    height: 20,
  },
  nextRoundButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  nextRoundButton: {
    width: 120,
    height: 25,
    borderRadius: 5,
    backgroundColor: "#fdda00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  nextRoundButtonText: {
    color: "#000500"
  },
  timer: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
  },
  lockSection: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  lock: {
    width: 20,
    height: 27.1,
  },
});

export default ScoreBoard;