import React, { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AdjusterProps = PropsWithChildren<{
    gameTimeMinutes: number;
    setGameTimeMinutes: Function;

}>;

const Adjuster = ({gameTimeMinutes, setGameTimeMinutes}: AdjusterProps) => {
    const decreaseTimeDisabled = gameTimeMinutes <= 0
    const increaseTimeDisabled = gameTimeMinutes >= 60

    return (
        <View style={styles.container}>
            <Text style={styles.adjusterLabel}>Timer:</Text>
            <View style={styles.adjuster}>
                <TouchableOpacity style={styles.adjusterButton} onPress={() => !decreaseTimeDisabled && setGameTimeMinutes(gameTimeMinutes - 5)}>
                    <Text style={[styles.adjusterButtonText, decreaseTimeDisabled && styles.disabled]}>-</Text>
                </TouchableOpacity>
                <View style={styles.numberDisplay}>
                    <Text style={styles.numberDisplayText}>
                        {gameTimeMinutes}
                    </Text>
                </View>
                <TouchableOpacity style={styles.adjusterButton} onPress={() => !increaseTimeDisabled && setGameTimeMinutes(gameTimeMinutes + 5)}>
                    <Text style={[styles.adjusterButtonText, increaseTimeDisabled && styles.disabled]}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.adjusterLabel}>minutes</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 50,
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    adjuster: {
        width: 150,
        height: 50,
        backgroundColor: "white",
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#020202",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    adjusterLabel: {
        fontSize: 20
    },
    adjusterButton: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    adjusterButtonText: {
        fontSize: 30,
        textAlign: "center",
    },
    disabled: {
        color: "lightgray"
    },
    numberDisplay: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    numberDisplayText: {
        fontSize: 30,
        textAlign: "center",
    }
})

export default Adjuster