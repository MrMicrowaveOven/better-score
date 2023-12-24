import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ScoreBoxesProps = {
    score1: number,
    score2: number,
    pointFor1: Function,
    minusPointFor1: Function,
    pointFor2: Function,
    minusPointFor2: Function,
    screenLocked: boolean,
}

const ScoreBoxes = (props : ScoreBoxesProps) => {
    const {score1, score2, pointFor1, minusPointFor1, pointFor2, minusPointFor2, screenLocked} = props
    return (
        <View>
            <View style={styles.addBoxes}>
                <TouchableOpacity style={[styles.addBox, styles.addBox1]} onPress={() => !screenLocked && pointFor1()}>
                <Text style={styles.scoreDisplay}>{score1}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.addBox, styles.addBox2]} onPress={() => !screenLocked && pointFor2()}>
                    <Text style={styles.scoreDisplay}>{score2}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.minusBoxes}>
                <TouchableOpacity
                    onPress={() => !screenLocked && minusPointFor1()}
                    style={[styles.minusBox, styles.minusBox1]}
                >
                    <Text style={styles.minusSymbol}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => !screenLocked && minusPointFor2()}
                    style={[styles.minusBox, styles.minusBox2]}
                >
                    <Text style={styles.minusSymbol}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    scoreDisplay: {
        fontSize: 60,
        fontWeight: "500",
        color: "black"
    },
    addBoxes: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    addBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: 150,
        zIndex: 1,
    },
    addBox1: {
        left: 0,
        backgroundColor: "rgba(90, 202, 133, 256)",
    },
    addBox2: {
        right: 0,
        backgroundColor: "rgba(249, 63, 64, 256)",
    },
    minusBoxes: {
        display: "flex",
        flexDirection: "row"
    },
    minusBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 47,
        width: "50%",
    },
    minusBox1: {
        left: 0,
        backgroundColor: "rgba(90, 202, 133, .3)"
    },
    minusBox2: {
        right: 0,
        backgroundColor: "rgba(255,0,0,.5)"
    },
    minusSymbol: {
        color: "black",
        textAlign: "center",
        fontSize: 30
    },
})

export default ScoreBoxes;