import React from 'react';
import {
    Text,
    View,
    StyleSheet,
  } from 'react-native';

const RoundScoreDisplay = ({roundScore1, roundScore2}) => {
    return (
        <View style={styles.main}>
            <View style={[styles.scoreList, styles.scoreList1]}>
                {roundScore1.map((score: number) => {
                    return <Text style={styles.score}>{score}</Text>
                })}
            </View>
            <View style={[styles.scoreList, styles.scoreList2]}>
                {roundScore2.map((score: number) => {
                    return <Text style={styles.score}>{score}</Text>
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        position: "absolute",
        top: 300,
    },
    scoreList: {
        display: "flex",
        alignItems: "center"
    },
    score: {
        fontSize: 30,
        color: "black",
        fontWeight: "400"
    },
    scoreList1: {
        width: "50%",
        height: 400,
        backgroundColor: "rgba(0, 128, 0, 0.3)"
    },
    scoreList2: {
        position: "absolute",
        width: "50%",
        height: 400,
        top: 0,
        right: 0,
        backgroundColor: "rgba(255,0,0, 0.3)"
    }
})

export default RoundScoreDisplay