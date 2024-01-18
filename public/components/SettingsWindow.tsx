import React, { PropsWithChildren } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SettingsWindowProps = PropsWithChildren<{
    isVisible: boolean;
    exit: Function;
}>;

const SettingsWindow = ({isVisible, exit} : SettingsWindowProps) => {
    const SettingsCheckbox = (label: string, onChange?: Function) => {
        return (
            <View style={styles.option}>
                <View style={styles.optionCheckboxContainer}>
                    <Text style={styles.optionCheckbox}>X</Text>
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

    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <ExitButton />
                    <Text style={styles.title}>Settings</Text>
                    <View style={styles.options}>
                        {SettingsCheckbox("Play Sound on Game Over")}
                        {SettingsCheckbox("Play Sound on Mission Imbocceball score")}
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
        height: "30%",
        backgroundColor: "white"
    },
    title: {
        fontSize: 50,
        textAlign: "center"
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