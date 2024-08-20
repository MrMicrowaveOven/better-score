import React, { PropsWithChildren } from "react";
import { Alert, Image, Modal, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import Adjuster from "./Adjuster";

type SettingsWindowProps = PropsWithChildren<{
    isVisible: boolean;
    exit: Function;
    playEndMusic: boolean;
    setPlayEndMusic: Function;
    playTeamThemeMusic: boolean;
    setPlayTeamThemeMusic: Function;
    playBocceMusic: boolean;
    setPlayBocceMusic: Function;
    gameTimeInMinutes: number;
    setGameTimeInMinutes: Function;
    playInPairs: boolean;
    setPlayInPairs: Function;
    autoPlayerShift: boolean;
    setAutoPlayerShift: Function;
}>;

const SettingsWindow = (
    {
        isVisible, exit,
        playEndMusic, setPlayEndMusic,
        playTeamThemeMusic, setPlayTeamThemeMusic,
        playBocceMusic, setPlayBocceMusic,
        playInPairs, setPlayInPairs,
        gameTimeInMinutes, setGameTimeInMinutes,
        autoPlayerShift, setAutoPlayerShift,
    } : SettingsWindowProps) => {
    const SettingsCheckbox = (label: string, onChange: Function, defaultChecked: boolean) => {
        return (
            <View style={styles.option}>
                <View style={styles.optionCheckboxContainer}>
                    <Switch
                        onValueChange={(isChecked: boolean) => onChange(isChecked)}
                        value={defaultChecked}
                        trackColor={{false: '#BDBDBD', true: '#BDBDBD'}}
                        thumbColor={defaultChecked ? '#020202' : "#757575"}
                        style={styles.switch}
                    />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        )
    }

    const ExitButton = () =>
        <TouchableOpacity style={styles.exitButton} onPress={() => exit()}>
            <Image source={require('../images/exit.png')} style={styles.exitButtonIcon}/>
        </TouchableOpacity>

    const dropdownData = [
        { label: 'No Timer', value: 0 },
        { label: '30 minutes', value: 30},
        { label: '45 minutes', value: 45},
        { label: '60 minutes', value: 60}
    ]

    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <ExitButton />
                    <View style={styles.titleContainer}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>Settings</Text>
                        </View>
                    </View>
                    <View style={styles.options}>
                        <View style={styles.checkboxes}>
                            {SettingsCheckbox('Play "Game Over" sound', (isChecked: boolean) => setPlayEndMusic(isChecked), playEndMusic)}
                            {SettingsCheckbox("Play Team Themes when they score", (isChecked: boolean) => setPlayTeamThemeMusic(isChecked), playTeamThemeMusic)}
                            {SettingsCheckbox("Play Celebratory Song on Bocce", (isChecked: boolean) => setPlayBocceMusic(isChecked), playBocceMusic)}
                            {SettingsCheckbox("Players roll in pairs", (isChecked: boolean) => setPlayInPairs(isChecked), playInPairs)}
                            {SettingsCheckbox("Automatically shift player on round end", (isChecked: boolean) => setAutoPlayerShift(isChecked), autoPlayerShift)}
                        </View>
                        <Adjuster
                            gameTimeInMinutes={gameTimeInMinutes}
                            setGameTimeInMinutes={setGameTimeInMinutes}
                        />
                        {/* <View style={styles.gameTimerSelector}>
                            <Text style={styles.gameTimerSelectorLabel}>Game Timer Length</Text>
                            <Dropdown
                                data={dropdownData}
                                labelField="label"
                                valueField="value"
                                onChange={(item) => onGameTimeChange(item.value)}
                                value={getDataByValue(gameTimeInMinutes)}
                                style={styles.gameTimeDropdown}
                            />
                        </View> */}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    modal: {
        width: "90%",
        height: 455,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        borderStyle: "solid"
    },
    titleContainer: {
        width: "100%",
        height: 64,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        width: "80%",
        marginTop: 20,
        borderBottomColor: "#000500",
        borderBottomWidth: 1,
        borderBottomStyle: "solid"
    },
    titleText: {
        fontSize: 32,
        textAlign: "center",
    },
    options: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        marginTop: 20,
        marginLeft: 20,
    },
    checkboxes: {
        width: "95%",
        height: 100,
        display: "flex",
        flexDirection: 'column',
        alignItems: "flex-start",
    },
    option: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: 10,
    },
    optionCheckboxContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 10,
        marginLeft: 15,
    },
    optionCheckbox: {
        right: 10,
        top: 0,
        bottom: 0,
        textAlign: "right",
    },
    switch: {
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
    },
    optionTextContainer: {
        width: "70%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: 10,
    },
    optionText: {
        fontSize: 18,
    },
    gameTimerSelector: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 20,
    },
    gameTimerSelectorLabel: {
        fontSize: 15,
    },
    gameTimeDropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 150
    },
    exitButton: {
        position: "absolute",
        zIndex: 1,
        top: 5,
        right: 10,
        width: 35,
        height: 35,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    exitButtonIcon: {
        width: 15,
        height: 15
    }
})

export default SettingsWindow;