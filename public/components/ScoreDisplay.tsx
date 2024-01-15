import React, { PropsWithChildren, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
  } from 'react-native';
import Prompt from './Prompt';

type LineUpButtonProps = PropsWithChildren<{
    roundScore1: number[];
    roundScore2: number[];
    editScore: Function;
    roundScore1edits: number[];
    roundScore2edits: number[];
}>

const RoundScoreDisplay = ({roundScore1, roundScore2, editScore, roundScore1edits, roundScore2edits}: LineUpButtonProps) => {
    const [editingScore, setEditingScore] = useState<(string|number|null)[]>([null, null])

    const previousScore = () => {
        if (
            typeof editingScore[1] === "number"
            && typeof roundScore1[editingScore[1]] === "number"
            && typeof roundScore2[editingScore[1]] === "number") {
            switch(editingScore[0]) {
                case 1:
                    return roundScore1[editingScore[1]].toString()
                case 2:
                    return roundScore2[editingScore[1]].toString()
                default:
                    return ""
            }
        }
    }

    const handleUpdate = (editedScore: string) => {
        const editedScoreInt = parseInt(editedScore)
        if(editedScoreInt >= 0 && editedScoreInt <= 4) {
            editScore(editedScoreInt, editingScore);
            setEditingScore([null, null])
        }
    }

    return (
        <View style={styles.main}>
            <View style={[styles.scoreList, styles.scoreList1, roundScore1.length > 10 && styles.scoreListWrap]}>
                {roundScore1.map((score: number, index: number) => {
                    return  <TouchableHighlight key={index} onLongPress={() => setEditingScore([1, index])}>
                                <Text style={[styles.score, {color: roundScore1edits.includes(index) ? "#fdda00" : "#000500"}]}>{score}</Text>
                            </TouchableHighlight>
                })}
            </View>
            <View style={[styles.scoreList, styles.scoreList2, roundScore2.length > 10 && styles.scoreListWrap]}>
                {roundScore2.map((score: number, index: number) => {
                    return  <TouchableHighlight key={index} onLongPress={() => setEditingScore([2, index])}>
                                <Text key={index} style={[styles.score, {color: roundScore2edits.includes(index) ? "#fdda00" : "#000500"}]}>{score}</Text>
                            </TouchableHighlight>
                })}
            </View>
            <View style={[styles.scoreTotals]}>
                <Text style={[styles.scoreTotal]}>{roundScore1.reduce((a: number, b: number) => a + b, 0)}</Text>
                <Text style={[styles.scoreTotal]}>{roundScore2.reduce((a: number, b: number) => a + b, 0)}</Text>
            </View>
            <Prompt
                title={"Edit Score"}
                defaultText={previousScore()}
                visible={!!editingScore[0]}
                response={(editedScore: string) => handleUpdate(editedScore)}
                maxChars={5}
            />
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