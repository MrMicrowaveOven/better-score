import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();

type Game = {
    team1: string;
    team2: string;
    score1: number[];
    score2: number[];
    time: Date;
  }

const Stats = () => {
    const [history, setHistory] = useMMKVStorage<Game[]>('history', storage, [])

    return (
        <ScrollView style={styles.body}>
            {history.reverse().map((game, index) =>
                <Game key={index} game={game}/>
            )}
        </ScrollView>
    )
}

type GameProps = {
    team1: string;
    team2: string;
    score1: number[];
    score2: number[];
    time: Date;
}

const Game = ({game}: any) => {
    const {team1, team2, score1, score2, time} = game
    return(
        <View style={styles.scoreCard}>
            <Text>{new Date(time).toString().split("GMT")[0]}</Text>
            <View style={styles.scores}>
                <View style={styles.score}>
                    <Text>{team1}</Text>
                    {score1.map((score: number, index: number) =>
                        <Text key={index}>{score}</Text>
                    )}
                </View>
                <View style={styles.score}>
                    <Text>{team2}</Text>
                    {score2.map((score: number, index: number) =>
                        <Text key={index}>{score}</Text>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    scoreCard: {
        width: "100%",
        backgroundColor: "yellow",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
    },
    scores: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 5,
    },
    score: {
        margin: 5
    }
})

export default Stats;