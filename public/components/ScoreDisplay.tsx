import React, { PropsWithChildren, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
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
    const [editingScoreTeam, setEditingScoreTeam] = useState<number|null>(null)
    const [editingScoreIndex, setEditingScoreIndex] = useState<number|null>(null)

    const previousScore = () => {
        if (
            typeof editingScoreIndex === "number"
            && typeof roundScore1[editingScoreIndex] === "number"
            && typeof roundScore2[editingScoreIndex] === "number") {
            switch(editingScoreTeam) {
                case 1:
                    return roundScore1[editingScoreIndex].toString()
                case 2:
                    return roundScore2[editingScoreIndex].toString()
                default:
                    return ""
            }
        } else {
            return ""
        }
    }

    const handleUpdate = (editedScore: string) => {
        const editedScoreInt = parseInt(editedScore)
        if(editedScoreInt >= 0 && editedScoreInt <= 4) {
            editScore(editedScoreInt, editingScoreTeam, editingScoreIndex);
            setEditingScoreTeam(null)
            setEditingScoreIndex(null)
        }
    }

    return (
        <View style={styles.main}>
            <View style={[styles.scoreList, styles.scoreList1, roundScore1.length > 10 && styles.scoreListWrap]}>
                {roundScore1.map((score: number, index: number) => {
                    return  <TouchableOpacity key={index} onLongPress={() => {setEditingScoreTeam(1); setEditingScoreIndex(index)}}>
                                <Text style={[styles.score, {color: roundScore1edits.includes(index) ? "#fdda00" : "#000500"}]}>{score}</Text>
                            </TouchableOpacity>
                })}
            </View>
            <View style={[styles.scoreList, styles.scoreList2, roundScore2.length > 10 && styles.scoreListWrap]}>
                {roundScore2.map((score: number, index: number) => {
                    return  <TouchableOpacity key={index} onLongPress={() => {setEditingScoreTeam(2); setEditingScoreIndex(index)}}>
                                <Text key={index} style={[styles.score, {color: roundScore2edits.includes(index) ? "#fdda00" : "#000500"}]}>{score}</Text>
                            </TouchableOpacity>
                })}
            </View>
            <View style={[styles.scoreTotals]}>
                <Text style={[styles.scoreTotal]}>{roundScore1.reduce((a: number, b: number) => a + b, 0)}</Text>
                <Text style={[styles.scoreTotal]}>{roundScore2.reduce((a: number, b: number) => a + b, 0)}</Text>
            </View>
            <Prompt
                title={"Edit Score"}
                defaultText={previousScore()}
                visible={!!editingScoreTeam}
                response={(editedScore: string) => handleUpdate(editedScore)}
                maxChars={5}
                keyboardType={"numeric"}
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