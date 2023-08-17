import React, {useState} from "react";
import {TouchableOpacity, Text, StyleSheet, View} from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";

const SOUND_OF_SILENCE = ["1","2","3","4","5","6","7","1","2","3","4","5","6","7",];

const LineUp = () => {
  const [data, setData] = useState(SOUND_OF_SILENCE);

  function keyExtractor(str: string) {
    return str;
  }

  function renderItem(info: DragListRenderItemInfo) {
    const {item, onStartDrag, isActive} = info;

    return (
      <TouchableOpacity
        key={item}
        style={{backgroundColor: isActive ? "skyblue" : "white"}}
        onPress={onStartDrag}
      >
        <Text style={styles.listItem}>{item}</Text>
      </TouchableOpacity>
    );
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
      <View style={styles.list}>
        <DragList
          data={data}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  list: {
    margin: 20,
    width: "80%",
    height: "80%",
    // backgroundColor: "blue"
  },
  listItem: {
    fontSize: 30
  }
})

export default LineUp