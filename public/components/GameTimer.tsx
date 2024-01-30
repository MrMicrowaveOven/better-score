import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

type GameTimerProps = PropsWithChildren<{
    timeLimit: number;
  }>;

const GameTimer = ({timeLimit}: GameTimerProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.text}>
                    45
                </Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.timeContainer}>
                <Text style={styles.text}>
                    00
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 90,
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    timeContainer: {
        width: 40,
        height: 40,
        backgroundColor: "yellow",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    colon: {
        fontSize: 25,
        color: "yellow"
    },
    text: {
        color: "#000500",
        fontSize: 25,
        fontWeight: "800",
        textAlign: "center"
    }
})

export default GameTimer;