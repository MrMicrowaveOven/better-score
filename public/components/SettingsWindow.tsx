import React, { PropsWithChildren } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

type SettingsWindowProps = PropsWithChildren<{
    isVisible: boolean;
}>;

const SettingsCheckbox = (label: string, onChange?: Function) => {
    return (
        <View>
            <Text>{label}</Text>
        </View>
    )
}

const SettingsWindow = ({isVisible} : SettingsWindowProps) => {
    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text>Settings</Text>
                    {SettingsCheckbox("Play Sound on Game Over")}
                    {SettingsCheckbox("Play Sound on Mission Imbocceball score")}
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
        width: "80%",
        height: "60%",
        backgroundColor: "white"
    }
})

export default SettingsWindow;