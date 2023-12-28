import React, { PropsWithChildren } from 'react';
import {
    Text,
    View,
    StyleSheet,
  } from 'react-native';

type LineUpButtonProps = PropsWithChildren<{
    roundScore1: number[];
    roundScore2: number[];
}>

const RoundScoreDisplay = ({roundScore1, roundScore2}: LineUpButtonProps) => {
    return (
        <View style={styles.main}>
            <View style={[styles.scoreList, styles.scoreList1, roundScore1.length > 10 && styles.scoreListWrap]}>
                {roundScore1.map((score: number, index: number) => {
                    return <Text key={index} style={styles.score}>{score}</Text>
                })}
            </View>
            <View style={[styles.scoreList, styles.scoreList2, roundScore2.length > 10 && styles.scoreListWrap]}>
                {roundScore2.map((score: number, index: number) => {
                    return <Text key={index} style={styles.score}>{score}</Text>
                })}
            </View>
            <View style={[styles.scoreTotals]}>
                <Text style={[styles.scoreTotal]}>{roundScore1.reduce((a: number, b: number) => a + b, 0)}</Text>
                <Text style={[styles.scoreTotal]}>{roundScore2.reduce((a: number, b: number) => a + b, 0)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        position: "absolute",
        top: 272,
    },
    scoreList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 380,
    },
    scoreListWrap: {
        flexWrap: "wrap",
    },
    scoreList1: {
        width: "50%",
        backgroundColor: "rgba(90, 202, 133, 1)"
    },
    scoreList2: {
        position: "absolute",
        width: "50%",
        top: 0,
        right: 0,
        backgroundColor: "rgba(255,0,0, 0.9)"
    },
    score: {
        fontSize: 28,
        color: "#000500",
        fontWeight: "400",
        marginHorizontal: 10
    },
    scoreTotals: {
        position: "relative",
        bottom: 0,
        width: "100%",
        height: 70,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    scoreTotal: {
        fontSize: 30,
        color: "#fdda00",
    },
})

export default RoundScoreDisplay