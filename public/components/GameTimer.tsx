import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Alert, AppState, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();

type GameTimerProps = PropsWithChildren<{
    gameTimeInSeconds: number;
    onGameOver: Function;
}>;

const GameTimer = ({gameTimeInSeconds, onGameOver}: GameTimerProps) => {
    const [startTime, setStartTime] = useMMKVStorage<number>('startTime', storage, new Date().getTime())
    const [timeInSeconds, setTimeInSeconds] = useState<number>(gameTimeInSeconds)

    // This whole section resets the timer when it moves back from being minimized
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            setProperTime()
          }

          appState.current = nextAppState;
          setAppStateVisible(appState.current);
        });

        return () => {
          subscription.remove();
        };
    }, []);
    // ///////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const interval = setInterval(() => {
            if(timeInSeconds > 0) {
                setTimeInSeconds(timeInSeconds - 1);
            }
        }, 1000);
        if(timeInSeconds === 0) onGameOver()
        return () => clearInterval(interval);
    }, [timeInSeconds]);

    const setProperTime = () => {
        const properTime = (Math.floor((gameTimeInSeconds*1000 - (new Date().getTime() - startTime))/1000))
        if (properTime > 0) {
            setTimeInSeconds(properTime)
        } else {
            setTimeInSeconds(0)
        }
    }

    useEffect(() => {
        setProperTime()
    }, [gameTimeInSeconds])

    const minutesOfTime = Math.floor(timeInSeconds / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
    const secondsOfTime = (timeInSeconds % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })

    const confirmResetTimer = () => {
        Alert.alert("Confirmation",
            "Are you sure you want to reset the timer?",[
                { text: "No", onPress: () => {} },
                { text: "Yes", onPress: () => reset() }
            ]
        )
    }

    const reset = () => {
        setStartTime(new Date().getTime())
        setTimeInSeconds(gameTimeInSeconds)
    }

    return (
        <TouchableOpacity onPress={() => confirmResetTimer()}>
            <View style={styles.container}>
                <View style={styles.timeContainer}>
                    <Text style={styles.text}>
                        {minutesOfTime}
                    </Text>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.text}>
                        {secondsOfTime}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
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
        backgroundColor: "#fdda00",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    colon: {
        fontSize: 25,
        color: "#fdda00"
    },
    text: {
        color: "#000500",
        fontSize: 25,
        fontWeight: "800",
        textAlign: "center"
    }
})

export default GameTimer;