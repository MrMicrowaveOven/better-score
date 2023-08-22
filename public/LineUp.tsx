import React, {useState} from "react";
import {TouchableOpacity, Text, StyleSheet, View, Button, Image, TouchableWithoutFeedback, Alert} from "react-native";
import DragList from "react-native-draglist";
import Prompt from "./Prompt"
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();

const DEFAULT_LIST = ["Player 1", "Player 2", "Player 3", "Player 4"];

const LineUp = () => {
  const [lineUp, setLineUp] = useMMKVStorage<string[]>('lineUp', storage, DEFAULT_LIST);
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
    setTurn(turn === numPlayers - 1 ? 0 : turn + 1)
  }

  function renderItem(info: any) {
    const {item, onStartDrag, isActive} = info;
    const index = lineUp.indexOf(item)
    return (
      <View>
        <TouchableOpacity
          key={item}
          style={{backgroundColor: isActive ? "skyblue" : "white"}}
          onPress={() => !locked && onStartDrag()}
        >
          <Text style={[styles.listItem, index === turn && locked && styles.listItemTurn]}>{item}</Text>
        </TouchableOpacity>
        {!locked
          ? <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setEditingPlayerNumber(index)}>
                  <Image source={require("./edit.png")} style={styles.editNameButton}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => !locked && deletePlayer(index)}>
                  <Image source={require("./delete.png")} style={styles.deletePlayerButton}/>
              </TouchableOpacity>
            </View>
          : <View style={styles.spaceBetweenPlayers}/>}
      </View>
    );
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

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Lineup</Text>
        <View style={styles.list}>
          <DragList
            data={lineUp}
            keyExtractor={keyExtractor}
            onReordered={onReordered}
            renderItem={renderItem}
          />
        </View>
      <View style={styles.addAndNextPlayerButton}>
        { locked
          ? <Button title={"Next turn"} onPress={nextTurn}/>
          : <View style={styles.editLineupButtons}>
              <View style={styles.editLineupButton}>
                <Button title={"Add Player"} onPress={addPlayer}/>
              </View>
              <View style={styles.editLineupButton}>
                <Button title={"Scramble!"} onPress={scramblePlayers}/>
              </View>
            </View>
        }
      </View>
      <View style={styles.lockContainer}>
        <TouchableWithoutFeedback onPress={() => setLocked(!locked)}>
          {locked
              ? <Image style={styles.lock} source={require('./locked.png')}/>
              : <Image style={styles.lock} source={require('./unlocked.png')}/>
            }
        </TouchableWithoutFeedback>
      </View>
      <Prompt
        title={editingPlayerNumber !== null ? `Edit ${lineUp[editingPlayerNumber]}` : ""}
        visible={editingPlayerNumber !== null}
        response={(newName : string) => setPlayerName(newName)}
        defaultText={editingPlayerNumber !== null ? lineUp[editingPlayerNumber] : ""}
        maxChars={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    backgroundColor: "rgba(220,220,220,1)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    margin: 10,
    color: "black"
  },
  scrollableList: {
    flex: 1,
    maxHeight: "80%"
  },
  list: {
    margin: 30,
    marginTop: 0,
    width: "80%",
    height: "75%",
  },
  listItem: {
    fontSize: 20,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
  },
  listItemTurn: {
    backgroundColor: "pink"
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
  spaceBetweenPlayers: {
    height: 10
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
  editLineupButton: {
    marginHorizontal: 10
  },
  lockContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: "70%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  lock: {
    width: 25,
    height: 25
  },
})

export default LineUp