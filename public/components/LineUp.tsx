import React, {useState} from "react";
import {TouchableOpacity, Text, StyleSheet, View, Button, Image, TouchableWithoutFeedback, Alert, SafeAreaView} from "react-native";
import DragList from "react-native-draglist";
import Prompt from "./Prompt"
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import LineUpButton  from "./LineUpButton";
import TopMenu from "./TopMenu";
const storage = new MMKVLoader().initialize();

const DEFAULT_LIST = ["Player 1", "Player 2", "Player 3", "Player 4"];

const LineUp = (props: any) => {
  const [lineUp, setLineUp] = useMMKVStorage<string[]>('lineUp', storage, DEFAULT_LIST);
  const [draggable, setDraggable] = useState<boolean>(false)
  const [locked, setLocked] = useState<boolean>(false)
  const [turn, setTurn] = useMMKVStorage<number>('turn', storage, 0)

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

  const nextTurn = () => {
    const numPlayers = lineUp.length
    const nextTurnIndex = turn + 1
    setTurn(nextTurnIndex >= numPlayers ? 0 : nextTurnIndex)
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
          <Text style={[styles.listItem, index === turn && locked && styles.listItemTurn]}>{item}</Text>
          {!locked && draggable && <Image source={require("../images/draggable.png")} style={styles.draggable}/>}
        </TouchableOpacity>
        {!locked &&
          <TouchableOpacity onPress={() => deletePlayer(index)}>
            <Image source={require("../images/delete.png")} style={styles.deletePlayerButton}/>
          </TouchableOpacity>
        }
      </View>
    );
  }

  const Buttons = () =>
    <View style={styles.addAndNextPlayerButton}>
      { locked
        ? <LineUpButton text={"NEXT TURN"} onPress={() => nextTurn()} />
        : draggable
          ? <View style={styles.editLineupButtons}>
              <LineUpButton text={"SCRAMBLE!"} onPress={scramblePlayers}/>
              <LineUpButton text={"DONE"} onPress={() => setDraggable(false)}/>
            </View>
          : <View style={styles.editLineupButtons}>
              <LineUpButton text={"ADD PLAYER"} onPress={addPlayer}/>
              <LineUpButton text={"REORDER"} onPress={() => setDraggable(true)}/>
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
    <SafeAreaView>
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
  body: {
    height: "100%",
    backgroundColor: "#000500",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
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
    marginTop: 20,
    color: "#fdda00"
  },
  scrollableList: {
    flex: 1,
    maxHeight: "80%"
  },
  list: {
    margin: 30,
    marginTop: 0,
    width: "100%",
    height: "75%",
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
  addAndNextPlayerButton: {
    position: "absolute",
    bottom: 30,
  },
  editLineupButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  lockContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
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