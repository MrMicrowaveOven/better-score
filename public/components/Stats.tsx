import React, { PropsWithChildren, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopMenu from "./TopMenu";

type Game = {
    team1: string;
    team2: string;
    score1: number[];
    score2: number[];
    score1edits: number[];
    score2edits: number[];
    time: Date;
  }
type ScoreBoardProps = PropsWithChildren<{
    history: Game[]
    goToScoreBoard: Function;
    deleteGame: Function;
    trashBin: Game[]
}>;

const Stats = ({history, goToScoreBoard, deleteGame, trashBin}: ScoreBoardProps) => {
    const [showTrashBin, setShowTrashBin] = useState<boolean>(false)
    const deleteCard = (index: number) => deleteGame(index)

    return (
        <View style={styles.background}>
            <TopMenu
                right={"SCOREBOARD"}
                rightAction={() => goToScoreBoard()}
                backgroundColor={"white"}
            />
            <Text style={styles.title}>{showTrashBin ? "Trash Bin" : "Stats"}</Text>
            <ScrollView style={styles.body}>
                <View style={styles.scoreCards}>
                    {(showTrashBin ? trashBin.length > 0 : history.length > 0)
                        ?   (showTrashBin ? trashBin : history).map((game, index) =>
                                <Game key={index} game={game} index={index} deleteCard={() => !showTrashBin && deleteCard(index)}/>
                            )
                        :   <View style={styles.noStatsMessage}>
                                <Text style={styles.noStatsMessageText}>
                                    No Game Stats yet...{"\n\n"} Go play some games and build some stats!
                                </Text>
                            </View>
                    }
                </View>
            </ScrollView>
            <View style={styles.trashBinButtonContainer}>
                <TouchableOpacity style={styles.trashBinButton} onPress={() => setShowTrashBin(!showTrashBin)}>
                    <Text style={styles.trashBinButtonText}>{showTrashBin ? "Back to Stats" : "Trash Bin"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

type GameProps = {
    index: number;
    game: Game;
    deleteCard: Function;
}

const Game = ({game, index, deleteCard}: GameProps) => {
    const {team1, team2, score1, score2, score1edits, score2edits, time} = game
    return(
        <View style={[styles.scoreCard, {backgroundColor: index % 4 === 1 || index % 4 === 2 ? "rgba(90, 202, 133, 256)" : "rgba(249, 63, 64, 256)"}]}>
            <Text style={styles.gameTime}>{new Date(time).toString().split("GMT")[0]}</Text>
            <View style={styles.scores}>
                <View style={styles.score}>
                    <Text style={styles.teamName}>{team1}</Text>
                    {score1.length === 0
                        ? <Text>{"(no score)"}</Text>
                        :   <View>
                                {score1.map((score: number, index: number) =>
                                    <Text style={[styles.scoreNumber, score1edits.includes(index) && {color: "#fdda00"}]} key={index}>{score}</Text>
                                )}
                                <View style={styles.horLine} />
                                <Text style={styles.scoreNumber}>{score1.reduce((a: number, b: number) => a + b, 0)}</Text>
                            </View>
                    }
                </View>
                <View style={styles.score}>
                    <Text style={styles.teamName}>{team2}</Text>
                    {score2.length === 0
                        ?   <Text>{"(no score)"}</Text>
                        :   <View>
                                {score2.map((score: number, index: number) =>
                                    <Text style={[styles.scoreNumber, score2edits.includes(index) && {color: "#fdda00"}]} key={index}>{score}</Text>
                                )}
                                <View style={styles.horLine} />
                                <Text style={styles.scoreNumber}>{score2.reduce((a: number, b: number) => a + b, 0)}</Text>
                            </View>
                    }
                </View>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCard()}>
                <Image style={styles.deleteIcon} source={require("../images/delete.png")} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
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
    noStatsMessage: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: 20,
    },
    noStatsMessageText: {
        fontSize: 30,
        textAlign: "center",
        width: "80%"
    },
    trashBinButtonContainer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    trashBinButton: {
        width: 150,
        backgroundColor: "#fdda00",
        borderRadius: 15,
        borderColor: "#000500",
        borderWidth: 2,
    },
    trashBinButtonText: {
        textAlign: "center",
        fontSize: 30,
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
        justifyContent: "space-around",
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
    horLine: {
        width: 40,
        height: 3,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
    },
    teamName: {
        textAlign: "center"
    },
    deleteButton: {
        position: "absolute",
        bottom: 10,
        right: 10
    },
    deleteIcon: {
        height: 20,
        width: 20
    }
})

export default Stats;