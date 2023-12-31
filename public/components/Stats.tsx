import React, { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TopMenu from "./TopMenu";

type Game = {
    team1: string;
    team2: string;
    score1: number[];
    score2: number[];
    time: Date;
  }
type ScoreBoardProps = PropsWithChildren<{
    history: Game[]
    goToScoreBoard: Function;
}>;

const Stats = ({history, goToScoreBoard}: ScoreBoardProps) => {
    return (
        <View style={styles.background}>
            <TopMenu
                right={"SCOREBOARD"}
                rightAction={() => goToScoreBoard()}
                backgroundColor={"white"}
            />
            <Text style={styles.title}>Stats</Text>
            <ScrollView style={styles.body}>
                <View style={styles.scoreCards}>
                    {history.reverse().map((game, index) =>
                        <Game key={index} game={game} index={index}/>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

type GameProps = {
    team1: string;
    team2: string;
    score1: number[];
    score2: number[];
    time: Date;
}

const Game = ({game, index}: any) => {
    const {team1, team2, score1, score2, time} = game
    return(
        <View style={[styles.scoreCard, {backgroundColor: index % 4 === 1 || index % 4 === 2 ? "rgba(90, 202, 133, 256)" : "rgba(249, 63, 64, 256)"}]}>
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
    background: {
        backgroundColor: "white"
    },
    title: {
        fontSize: 40,
        margin: 10,
        marginTop: 0,
        color: "black",
        textAlign: "center",
    },
    body: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderTopColor: "black",
        borderTopWidth: 1,
        borderTopStyle: "solid"
    },
    scoreCards: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    scoreCard: {
        width: "50%",
        // backgroundColor: "#fdda00",
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