import React, { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AdjusterProps = PropsWithChildren<{
    gameTimeInMinutes: number;
    setGameTimeInMinutes: Function;

}>;

const Adjuster = ({gameTimeInMinutes, setGameTimeInMinutes}: AdjusterProps) => {
    const decreaseTimeDisabled = gameTimeInMinutes <= 0
    const increaseTimeDisabled = gameTimeInMinutes >= 60

    return (
        <View style={styles.container}>
            <Text style={styles.adjusterLabel}>Timer:</Text>
            <View style={styles.adjuster}>
                <TouchableOpacity style={styles.adjusterButton} onPress={() => !decreaseTimeDisabled && setGameTimeInMinutes(gameTimeInMinutes - 5)}>
                    <Text style={[styles.adjusterButtonText, decreaseTimeDisabled && styles.disabled]}>-</Text>
                </TouchableOpacity>
                <View style={styles.numberDisplay}>
                    <Text style={styles.numberDisplayText}>
                        {gameTimeInMinutes}
                    </Text>
                </View>
                <TouchableOpacity style={styles.adjusterButton} onPress={() => !increaseTimeDisabled && setGameTimeInMinutes(gameTimeInMinutes + 5)}>
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