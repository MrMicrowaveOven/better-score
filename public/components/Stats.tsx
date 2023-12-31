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
            <Text style={styles.title}>Stats</Text>
            <View style={styles.scoreCards}>
                {history.reverse().map((game, index) =>
                    <Game key={index} game={game}/>
                )}
            </View>
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
            <Text style={styles.gameTime}>{new Date(time).toString().split("GMT")[0]}</Text>

            <View style={styles.scores}>
                <View style={styles.score}>
                    <Text style={styles.teamName}>{team1}</Text>
                    {score1.length === 0
                        ? <Text>{"(no score)"}</Text>
                        :   score1.map((score: number, index: number) =>
                                <Text key={index}>{score}</Text>
                            )
                    }
                </View>
                <View style={styles.score}>
                    <Text style={styles.teamName}>{team2}</Text>
                    {score2.length === 0
                        ? <Text>{"(no score)"}</Text>
                        :   score2.map((score: number, index: number) =>
                                <Text style={styles.scoreNumber} key={index}>{score}</Text>
                            )
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        margin: 10,
        marginTop: 10,
        color: "black",
        textAlign: "center",
    },
    body: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    scoreCards: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    scoreCard: {
        width: "50%",
        backgroundColor: "#fdda00",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
    },
    gameTime: {
        margin: 5,
    },
    scores: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 5,
    },
    score: {
        margin: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    scoreNumber: {
        textAlign: "center"
    },
    teamName: {
        textAlign: "center"
    }
})

export default Stats;