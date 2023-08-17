import React, {useState} from "react";
import {TouchableOpacity, Text, StyleSheet, View, Button, Image, TouchableWithoutFeedback} from "react-native";
import DragList from "react-native-draglist";

const DEFAULT_LIST = ["Player 1", "Player 2", "Player 3", "Player 4"];

const LineUp = () => {
  const [data, setData] = useState(DEFAULT_LIST);
  const [locked, setLocked] = useState(true)

  function keyExtractor(str: string) {
    return str;
  }

  function renderItem(info: any) {
    const {item, onStartDrag, isActive} = info;

    return (
      <TouchableOpacity
        key={item}
        style={{backgroundColor: isActive ? "skyblue" : "white"}}
        onPress={() => !locked && onStartDrag()}
      >
        <Text style={styles.listItem}>{item}</Text>
      </TouchableOpacity>
    );
  }

  const addPlayer = () => {
    const numPlayers = data.length
    const playerName = "Player " + (numPlayers + 1)
    setData([...data, playerName])
  }

  async function onReordered(fromIndex: number, toIndex: number) {
    // // Since we remove the element first, account for its index shift
    const finalIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
    const copy = [...data];		// Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(finalIndex, 0, removed[0]);	// Now insert at the new pos
	  setData(copy);
  }

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Lineup</Text>
      <View style={styles.list}>
        <DragList
          data={data}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.lockContainer}>
        <TouchableWithoutFeedback onPress={() => setLocked(!locked)}>
          {locked
              ? <Image style={styles.lock} source={require('./locked.png')}/>
              : <Image style={styles.lock} source={require('./unlocked.png')}/>
            }
        </TouchableWithoutFeedback>
      </View>
      <Button title={"Add Player"} onPress={addPlayer}/>
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
    color: "black"
  },
  list: {
    margin: 20,
    width: "80%",
  },
  listItem: {
    fontSize: 30,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
  },
  lockContainer: {
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