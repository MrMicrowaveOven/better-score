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
import SoundPlayer from 'react-native-sound-player'

type ScoreBoardProps = PropsWithChildren<{
  goToLineUp: Function;
  goToStats: Function;
  statsPage: boolean;
  saveHistory: Function;
}>;

const ScoreBoard = ({goToLineUp, goToStats, statsPage, saveHistory}: ScoreBoardProps) => {
  const [team1Name, setTeam1Name] = useMMKVStorage<string>('team1Name', storage, "Team 1")
  const [team2Name, setTeam2Name] = useMMKVStorage<string>('team2Name', storage, "Team 2")
  const [score1, setScore1] = useMMKVStorage<number>('score1', storage, 0)
  const [score2, setScore2] = useMMKVStorage<number>('score2', storage, 0)
  const [roundScore1, setRoundScore1] = useMMKVStorage<number[]>('roundScore1', storage, [])
  const [roundScore2, setRoundScore2] = useMMKVStorage<number[]>('roundScore2', storage, [])
  const [roundScore1edits, setroundScore1edits] = useMMKVStorage<number[]>('roundScore1edits', storage, [])
  const [roundScore2edits, setroundScore2edits] = useMMKVStorage<number[]>('roundScore2edits', storage, [])

  const [screenLocked, setScreenLocked] = useState<boolean>(false)

  const [timerId, setTimerId] = useMMKVStorage<number>('timerId', storage, Math.random())

  const pointFor1 = () => score2 == 0 && score1 < 4 && setScore1(score1 + 1)
  const pointFor2 = () => score1 == 0 && score2 < 4 && setScore2(score2 + 1)

  const minusPointFor1 = () => score1 > 0 && setScore1(score1 - 1)
  const minusPointFor2 = () => score2 > 0 && setScore2(score2 - 1)

  const nextRound = () => {
    if (shouldPlayMissionImpossibleTheme()) playMissionImpossibleTheme()
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

  const setTeamName = (renamingTeam: number, newName: string) => {
    renamingTeam === 1
              ? setTeam1Name(newName)
              : setTeam2Name(newName)
  }

  const shouldPlayMissionImpossibleTheme = () => {
    if (team1Name === "Mission Imbocceball" && score1 > score2) {
      return true
    } else if (team2Name === "Mission Imbocceball" && score1 < score2) {
      return true
    } else {
      return false
    }
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

  const playGameOverSound = () => {
    try {
      SoundPlayer.playSoundFile('game_over_sound', 'mp3')
    } catch (e) {

    }
  }

  const playMissionImpossibleTheme = () => {
    try {
      SoundPlayer.playSoundFile('mission_impossible_theme', 'mp3')
    } catch (e) {

    }
  }

  const editScore = (editedScore: number, editingScore: Array<string|number|null>) => {
    const [editingTeam, scoreIndex] = editingScore
    const oldRoundScore = editingTeam == 1 ? roundScore1 : roundScore2
    if (typeof scoreIndex === 'number' && typeof editingTeam === 'number') {
      if(oldRoundScore[scoreIndex] !== editedScore) {
        addToRoundScoreEdits(editingTeam, scoreIndex)
        oldRoundScore[scoreIndex] = editedScore
        editingTeam == 1 ? setRoundScore1(oldRoundScore) : setRoundScore2(oldRoundScore)
      }
    }
  }

  const addToRoundScoreEdits = (editingTeam: number, scoreIndex: number) => {
    const edits = editingTeam === 1 ? roundScore1edits : roundScore2edits
    edits.push(scoreIndex)
    editingTeam === 1 ? setroundScore1edits(edits) : setroundScore2edits(edits)
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
      <ScoreTitles
        screenLocked={screenLocked}
        setTeamName={(renamingTeam: number, newName: string) => setTeamName(renamingTeam, newName)}
        team1Name={team1Name}
        team2Name={team2Name}
      />
      <ScoreBoxes
        score1={score1}
        score2={score2}
        pointFor1={pointFor1}
        minusPointFor1={minusPointFor1}
        pointFor2={pointFor2}
        minusPointFor2={minusPointFor2}
        screenLocked={screenLocked}
      />
      <RoundScoreDisplay
        roundScore1={roundScore1}
        roundScore2={roundScore2}
        editScore={(editedScore: number, editingScore: Array<string|number|null>) => editScore(editedScore, editingScore)}
        roundScore1edits={roundScore1edits}
        roundScore2edits={roundScore2edits}
      />
      <View style={styles.timer}>
        <CountDown
          id={timerId.toString()}
          until={45 * 60}
          timeToShow={['M', 'S']}
          timeLabels={{m: null, s: null}}
          separatorStyle={{color: 'yellow', fontSize: 30}}
          showSeparator
          onPress={confirmResetTimer}
          onFinish={() => playGameOverSound()}
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