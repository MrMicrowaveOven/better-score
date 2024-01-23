import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ScoreBoard from './public/components/ScoreBoard';
import LineUp from './public/components/LineUp'
import Stats from "./public/components/Stats"
import PagerView from 'react-native-pager-view';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();

type Game = {
  team1: string;
  team2: string;
  score1: number[];
  score2: number[];
  score1edits: number[];
  score2edits: number[];
  time: Date;
}

type GameRound = {
  roundScore1: number[];
  roundScore2: number[];
  roundScore1edits: number[];
  roundScore2edits: number[];
}

const App = () => {
  const [history, setHistory] = useMMKVStorage<Game[]>('history', storage, [])
  const [trashBin, setTrashBin] = useMMKVStorage<Game[]>('trashBin', storage, [])
  const pagerViewRef: any = useRef(null);
  // if (history.length > 0) setHistory([])

  const goToStats = () => {
    pagerViewRef?.current?.setPage(0)
  }

  const goToScoreBoard = () => {
    pagerViewRef?.current?.setPage(1)
  }

  const goToLineUp = () => {
    pagerViewRef?.current?.setPage(2)
  }

  const saveHistory = async (lastGame: GameRound) => {
    const MMKV = new MMKVLoader().initialize();
    const team1 = await MMKV.getStringAsync("team1Name") ?? "Team 1";
    const team2 = await MMKV.getStringAsync("team2Name") ?? "Team 2";
    const game = {
      team1: team1,
      team2: team2,
      score1: lastGame.roundScore1,
      score2: lastGame.roundScore2,
      score1edits: lastGame.roundScore1edits,
      score2edits: lastGame.roundScore2edits,
      time: new Date(),
    }
    const previousHistory = history
    previousHistory.unshift(game)
    setHistory(previousHistory)
  }

  const deleteGame = (index: number) => {
    const oldHistory = [...history]
    const deletedGame = oldHistory.splice(index, 1)
    const oldTrashBin = [...trashBin]
    oldTrashBin.unshift(deletedGame[0])
    setTrashBin(oldTrashBin)
    setHistory(oldHistory)
  }

  const statsPage = true

  return (
    <PagerView style={styles.pagerView} initialPage={1} ref={pagerViewRef}>
      <View key="0">
        <Stats
          goToScoreBoard={goToScoreBoard}
          history={history}
          deleteGame={(index: number) => deleteGame(index)}
          trashBin={trashBin}
        />
      </View>
      <View key="1">
        <ScoreBoard
          goToLineUp={goToLineUp}
          goToStats={goToStats}
          statsPage={statsPage}
          saveHistory={(game: GameRound) => saveHistory(game)}
        />
      </View>
      <View key="2">
        <LineUp
          goToScoreBoard={goToScoreBoard}
        />
      </View>
    </PagerView>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export default App;