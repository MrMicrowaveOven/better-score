import React, { PropsWithChildren } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Checkbox from "./Checkbox";
import { Dropdown } from 'react-native-element-dropdown';

type SettingsWindowProps = PropsWithChildren<{
    isVisible: boolean;
    exit: Function;
    playEndMusic: boolean;
    setPlayEndMusic: Function;
    playMIMusic: boolean;
    setPlayMIMusic: Function;
    gameTimeMinutes: 0|30|45|60;
    setGameTimeMinutes: Function;
}>;

const SettingsWindow = ({isVisible, exit, playEndMusic, setPlayEndMusic, playMIMusic, setPlayMIMusic, gameTimeMinutes, setGameTimeMinutes} : SettingsWindowProps) => {
    const SettingsCheckbox = (label: string, onChange: Function, defaultChecked: boolean) => {
        return (
            <View style={styles.option}>
                <View style={styles.optionCheckboxContainer}>
                    <Checkbox onChange={(isChecked: boolean) => onChange(isChecked)} defaultChecked={defaultChecked}/>
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        )
    }

    const ExitButton = () =>
        <TouchableOpacity style={styles.exitButton} onPress={() => exit()}>
            <Text style={styles.exitButtonText}>X</Text>
        </TouchableOpacity>

    const dropdownData = [
        { label: 'No Timer', value: 0 },
        { label: '30 minutes', value: 30},
        { label: '45 minutes', value: 45},
        { label: '60 minutes', value: 60}
    ]

    const getDataByValue = (value: 0|30|45|60) => dropdownData.find((item) => item.value === value)

    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <ExitButton />
                    <Text style={styles.title}>Settings</Text>
                    <View style={styles.options}>
                        {SettingsCheckbox("Play Sound on Game Over", (isChecked: boolean) => setPlayEndMusic(isChecked), playEndMusic)}
                        {SettingsCheckbox("Play Sound on Mission Imbocceball score", (isChecked: boolean) => setPlayMIMusic(isChecked), playMIMusic)}
                        <View style={styles.gameTimerSelector}>
                            <Text style={styles.gameTimerSelectorLabel}>Game Timer Length</Text>
                            <Dropdown
                                data={dropdownData}
                                labelField="label"
                                valueField="value"
                                onChange={(item) => setGameTimeMinutes(item.value)}
                                value={getDataByValue(gameTimeMinutes)}
                                style={styles.gameTimeDropdown}
                            />
                        </View>
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
        height: "100%"
    },
    modal: {
        width: "90%",
        height: "50%",
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        borderStyle: "solid"
    },
    title: {
        fontSize: 50,
        textAlign: "center",
        marginTop: 20,
    },
    options: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        marginTop: 20
    },
    option: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        marginTop: 10
    },
    optionCheckboxContainer: {
        width: "25%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 10,
    },
    optionCheckbox: {
        right: 10,
        top: 0,
        bottom: 0,
        textAlign: "right"
    },
    optionTextContainer: {
        width: "70%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    optionText: {
        fontSize: 20,
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
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    exitButtonText: {
        fontSize: 25,
        textAlign: "center",
    }
})

export default SettingsWindow;