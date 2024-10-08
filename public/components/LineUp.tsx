import React, {useEffect, useState} from "react";
import {TouchableOpacity, Text, StyleSheet, View, Image, TouchableWithoutFeedback, Alert, SafeAreaView} from "react-native";
import DragList from "react-native-draglist";
import Prompt from "./Prompt"
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import LineUpButton  from "./LineUpButton";
import TopMenu from "./TopMenu";
const storage = new MMKVLoader().initialize();

const DEFAULT_LIST = ["Player 1", "Player 2", "Player 3", "Player 4"];

const LineUp = (props: any) => {
  const {playInPairs, roundEnd} = props
  const [lineUp, setLineUp] = useMMKVStorage<string[]>('lineUp', storage, DEFAULT_LIST);
  const [draggable, setDraggable] = useState<boolean>(false)
  const [locked, setLocked] = useState<boolean>(false)
  const [turn, setTurn] = useMMKVStorage<number>('turn', storage, 0)

  useEffect(() => {
    playInPairs
      ? nextTurn(2)
      : nextTurn(1)
  }, [roundEnd])

  const [editingPlayerNumber, setEditingPlayerNumber] = useState<number | null>(null)

  function keyExtractor(str: string) {
    return str;
  }

  const setPlayerName = (newName : string) => {
    if(newName && editingPlayerNumber !== null){
      const names = [...lineUp]
      names[editingPlayerNumber] = newName
      setLineUp(names)
    }
    setEditingPlayerNumber(null)
  }

  const nextTurn = (numTurns: number = 1) => {
    const numPlayers = lineUp.length
    const nextTurnIndex = turn + numTurns
    setTurn(nextTurnIndex >= numPlayers ? nextTurnIndex - numPlayers : nextTurnIndex)
  }

  const deletePlayer = (index: number) => {
    const players = [...lineUp]
    players.splice(index, 1)
    setLineUp(players)
  }

  const addPlayer = () => {
    let playerNameStart = "Player "
    let playerNumber = 1
    while(lineUp.indexOf(playerNameStart + playerNumber) !== -1) {
      playerNumber += 1
    }
    const playerName = playerNameStart + playerNumber
    setLineUp([...lineUp, playerName])
  }

  const scramblePlayers = () => {
    Alert.alert("Confirmation",
      "Are you sure you want scramble the order of all players?",[
        { text: "No", onPress: () => {} },
        { text: "Yes", onPress: () => {
          const playerList = [...lineUp]
          const scrambledPlayersList = playerList
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
          setLineUp(scrambledPlayersList)
        }}
      ]
    )
  }

  const swapPartners = () => {
    const playerList = [...lineUp]
    if (playerList.length % 2 === 0) {
      for(let i = 0; i < playerList.length; i = i + 2) {
        const holder = playerList[i]
        playerList[i] = playerList[i + 1]
        playerList[i + 1] = holder
      }
      setLineUp(playerList)
    } else {
      Alert.alert("Cannot Swap Partners if number of players is not even")
    }
  }

  async function onReordered(fromIndex: number, toIndex: number) {
    // // Since we remove the element first, account for its index shift
    const finalIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
    const copy = [...lineUp];		// Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(finalIndex, 0, removed[0]);	// Now insert at the new pos
	  setLineUp(copy);
  }

  const LineUpList = () =>
    <View style={styles.list}>
      <DragList
        data={lineUp}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
      />
    </View>

  const shouldBeHighlighted = (index: number) => {
    return locked && (index === turn || (index == turn + 1 && playInPairs) || ( index == 0 && turn == lineUp.length - 1 && playInPairs))
  }
  
  const renderItem = (info: any) => {
    const {item, onDragStart, onDragEnd, isActive} = info;
    const index = lineUp.indexOf(item)
    return (
      <View style={styles.playerRow}>
        {!locked &&
          <TouchableOpacity onPress={() => setEditingPlayerNumber(index)}>
            <Image source={require("../images/edit.png")} style={styles.editNameButton}/>
          </TouchableOpacity>
        }
        <TouchableOpacity
          onPressIn={() => draggable && onDragStart()}
          onPressOut={onDragEnd}
          key={item}
          style={[styles.player, {backgroundColor: "white"}]}
          activeOpacity={1}
        >
          <Text style={[styles.listItem, shouldBeHighlighted(index) && styles.listItemTurn]}>{item}</Text>
          {!locked && draggable && <Image source={require("../images/draggable.png")} style={styles.draggable}/>}
        </TouchableOpacity>
        {!locked &&
          <TouchableOpacity onPress={() => deletePlayer(index)}>
            <Image source={require("../images/deleteYellow.png")} style={styles.deletePlayerButton}/>
          </TouchableOpacity>
        }
      </View>
    );
  }

  const Buttons = () =>
    <View style={styles.buttons}>
      { locked
        ? <View style={{flex: 1}}>
            <View style={styles.buttonsRow}>
              <LineUpButton text={"NEXT TURN"} onPress={() => nextTurn()} />
            </View>
          </View>
        : draggable
          ? <View style={{flex: 1}}>
              <View style={styles.buttonsRow}>
                <LineUpButton text={"SCRAMBLE!"} onPress={scramblePlayers}/>
                <LineUpButton text={"SWAP PARTNERS"} onPress={swapPartners}/>
              </View>
              <View style={styles.buttonsRow}>
                <LineUpButton text={"DONE"} onPress={() => setDraggable(false)}/>
              </View>
            </View>
          : <View style={{flex: 1}}>
              <View style={styles.buttonsRow}>
                <LineUpButton text={"ADD PLAYER"} onPress={addPlayer}/>
                <LineUpButton text={"REORDER"} onPress={() => setDraggable(true)}/>
              </View>
            </View>
      }
    </View>

  const LockButton = () =>
    <View style={styles.lockContainer}>
      <TouchableWithoutFeedback onPress={() => {setLocked(!locked); setDraggable(false)}}>
        {locked
            ? <Image style={styles.lock} source={require('../images/locked.png')}/>
            : <Image style={styles.lock} source={require('../images/unlocked.png')}/>
          }
      </TouchableWithoutFeedback>
    </View>

  return (
    <SafeAreaView style={styles.container}>
      <TopMenu
        left={"SCOREBOARD"}
        leftAction={() => props.goToScoreBoard()}
        backgroundColor={"#000500"}
      />
      <View style={styles.body}>
        <Text style={styles.title}>Lineup</Text>
        <LineUpList />
        <Buttons />
        <LockButton />
        <Prompt
          title={editingPlayerNumber !== null ? `Edit ${lineUp[editingPlayerNumber]}` : ""}
          visible={editingPlayerNumber !== null}
          response={(newName : string) => setPlayerName(newName)}
          defaultText={editingPlayerNumber !== null ? lineUp[editingPlayerNumber] : ""}
          maxChars={30}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000500",
  },
  body: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  moveToScoreBoard: {
    width: 120,
    height: 30,
    backgroundColor: "#fdda00",
    position: "absolute",
    left: 0,
    top: 0,
    borderRightColor: "#000500",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderBottomColor: "#000500",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: 5
  },
  moveToScoreBoardText: {
    color: "#000500"
  },
  moveToScoreBoardArrow: {
    height: 20,
    width: 20,
  },
  title: {
    fontSize: 40,
    margin: 10,
    marginTop: 0,
    color: "#fdda00",
  },
  scrollableList: {
    flex: 1,
  },
  list: {
    margin: 30,
    marginTop: 0,
    marginBottom: 10,
    width: "100%",
    flex: 1,
    paddingVertical: 10,
    // borderColor: "#fdda00",
    // borderWidth: 1,
    // borderStyle: "solid",
  },
  listItem: {
    fontSize: 20,
    borderColor: "#000500",
    borderWidth: 1,
    padding: 5,
  },
  listItemTurn: {
    backgroundColor: "#fdda00"
  },
  playerRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 15,
  },
  player: {
    width: "80%"
  },
  draggable: {
    position: "absolute",
    right: 12,
    top: 8,
    width: 20,
    height: 20,
  },
  editNameButton: {
    width: 20,
    height: 20,
    margin: 5,
  },
  deletePlayerButton: {
    width: 20,
    height: 20,
    margin: 5,
  },
  buttons: {
    width: "100%",
    height: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
  },
  buttonsRow: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lockContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  lock: {
    width: 20,
    height: 27.1,
  },
})

export default LineUp