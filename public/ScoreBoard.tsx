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
import RoundScoreDisplay from './RoundScoreDisplay';
import Prompt from './Prompt';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const ScoreBoard = () => {
  const [team1Name, setTeam1Name] = useState("Team 1")
  const [team2Name, setTeam2Name] = useState("Team 2")
  const [renamingTeam, setRenamingTeam] = useState(null)
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [roundScore1, setRoundScore1] = useState([])
  const [roundScore2, setRoundScore2] = useState([])

  const [screenLocked, setScreenLocked] = useState(false)

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

  const renameTeam = (newName) => {
    renamingTeam === 1
      ? setTeam1Name(newName)
      : setTeam2Name(newName)
    setRenamingTeam(null)
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
      <View style={styles.endRoundButton}>
        <Button title="Save Round Score" onPress={() => !screenLocked && confirmNextRound()}/>
      </View>
      <View style={styles.scoreTitles}>
        <TouchableWithoutFeedback onLongPress={() => setRenamingTeam(1)}>
          <Text style={styles.scoreTitle} adjustsFontSizeToFit={true} numberOfLines={1}>
            {team1Name}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onLongPress={() => setRenamingTeam(2)}>
          <Text style={styles.scoreTitle} adjustsFontSizeToFit={true} numberOfLines={1}>
            {team2Name}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.scoreBoxes}>
        <TouchableOpacity style={[styles.scoreBox, styles.scoreBox1]} onPress={() => !screenLocked && pointFor1()}>
          <Text style={styles.scoreDisplay}>{score1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.scoreBox, styles.scoreBox2]} onPress={() => !screenLocked && pointFor2()}>
            <Text style={styles.scoreDisplay}>{score2}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.minusBoxes}>
        <TouchableOpacity
          onPress={() => !screenLocked && minusPointFor1()}
          style={[styles.minusBox, styles.minusBox1]}
        >
          <Text style={styles.minusSymbol}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => !screenLocked && minusPointFor2()}
          style={[styles.minusBox, styles.minusBox2]}
        >
          <Text style={styles.minusSymbol}>-</Text>
        </TouchableOpacity>
      </View>
      <RoundScoreDisplay roundScore1={roundScore1} roundScore2={roundScore2}/>
      <View style={styles.resetButton}>
        <Button title="Reset Game" onPress={() => !screenLocked && confirmReset()}/>
      </View>
      <TouchableWithoutFeedback onPress={() => setScreenLocked(!screenLocked)}>
        <View style={styles.lockSection}>
          {screenLocked
            ? <Image style={styles.lock} source={require('./locked.png')}/>
            : <Image style={styles.lock} source={require('./unlocked.png')}/>
          }
        </View>
      </TouchableWithoutFeedback>
      <Prompt
        title={renamingTeam !== null && `Rename ${renamingTeam === 1 ? team1Name : team2Name}`}
        visible={renamingTeam !== null}
        response={newName => renameTeam(newName)}
        defaultText={renamingTeam !== null && (renamingTeam === 1 ? team1Name : team2Name)}
      />
    </View>
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
    zIndex: 1,
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