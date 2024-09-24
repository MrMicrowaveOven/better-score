import React, { PropsWithChildren, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
  } from 'react-native';
import Prompt from './Prompt';

type RoundScoreDisplayProps = PropsWithChildren<{
    roundScore1: number[];
    roundScore2: number[];
    editScore: Function;
    roundScore1edits: number[];
    roundScore2edits: number[];
    screenLocked: boolean;
}>

const RoundScoreDisplay = ({roundScore1, roundScore2, editScore, roundScore1edits, roundScore2edits, screenLocked}: RoundScoreDisplayProps) => {
    const [editingScoreTeam, setEditingScoreTeam] = useState<number|null>(null)
    const [editingScoreIndex, setEditingScoreIndex] = useState<number|null>(null)
    const [badScore, setBadScore] = useState<number|null>(null)

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

    const handleEdit = (team: number, index: number) => {
        if((team === 1 && roundScore2[index] === 0) || (team === 2 && roundScore1[index] === 0)) {
            setEditingScoreTeam(team)
            setEditingScoreIndex(index)
        } else {
            cannotEditError()
        }
    }

    const cannotEditError = () => Alert.alert("Edit Score Error", "Cannot edit score from 0, as the other team has a non-zero score in that round.")

    const handleUpdate = (editedScore: string) => {
        const editedScoreInt = parseInt(editedScore)
        if(editedScoreInt >= 0 && editedScoreInt <= 4) {
            editScore(editedScoreInt, editingScoreTeam, editingScoreIndex);
            setEditingScoreTeam(null)
            setEditingScoreIndex(null)
            setBadScore(null)
        } else {
            setBadScore(editedScoreInt)
        }
    }

    const errorMessageText = () =>
        badScore !== badScore
            ? "Invalid score.\nPlease enter a score 0 through 4."
            : typeof badScore === 'number'
                ? `${badScore} is an invalid score.\nPlease enter a score 0 through 4.`
                : undefined

    return (
        <View style={styles.main}>
            <View style={styles.scoreLists}>
                <View style={[styles.scoreList, styles.scoreList1]}>
                    <View style={styles.scoreListWrap}>
                        {roundScore1.map((score: number, index: number) => {
                            return  <TouchableOpacity key={index} onLongPress={() => !screenLocked && handleEdit(1, index)}>
                                        <Text style={[styles.score, {color: roundScore1edits.includes(index) ? "#fdda00" : "#000500"}]}>{score}</Text>
                                    </TouchableOpacity>
                        })}
                    </View>
                </View>
                <View style={[styles.scoreList, styles.scoreList2]}>
                    <View style={styles.scoreListWrap}>
                        {roundScore2.map((score: number, index: number) => {
                            return  <TouchableOpacity key={index} onLongPress={() => !screenLocked && handleEdit(2, index)}>
                                        <Text key={index} style={[styles.score, {color: roundScore2edits.includes(index) ? "#fdda00" : "#000500"}]}>{score}</Text>
                                    </TouchableOpacity>
                        })}
                    </View>
                </View>
            </View>
            <View style={[styles.scoreTotals]}>
                <Text style={[styles.scoreTotal]}>{roundScore1.reduce((a: number, b: number) => a + b, 0)}</Text>
                <Text style={[styles.scoreTotal]}>{roundScore2.reduce((a: number, b: number) => a + b, 0)}</Text>
            </View>
            <Prompt
                title={"Edit Score"}
                errorMessage={errorMessageText()}
                defaultText={previousScore()}
                visible={!!editingScoreTeam}
                response={(editedScore: string) => handleUpdate(editedScore)}
                maxChars={1}
                keyboardType={"numeric"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    scoreLists: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginBottom: 100,
    },
    scoreList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: '100%',
        marginBottom: 100,
    },
    scoreListWrap: {
        flexWrap: "wrap",
    },
    scoreList1: {
        width: "50%",
        backgroundColor: "rgba(90, 202, 133, 1)"
    },
    scoreList2: {
        width: "50%",
        backgroundColor: "rgba(255,0,0, 0.9)"
    },
    score: {
        fontSize: 28,
        fontWeight: "400",
        marginHorizontal: 10
    },
    scoreTotals: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 100,
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