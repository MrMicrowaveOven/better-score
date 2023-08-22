import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

type PromptProps = {
    title: string;
    response: Function;
    defaultText: string;
    visible: boolean;
    maxChars: number;
}

const Prompt = (props : PromptProps) => {
    const {title, response, defaultText, visible, maxChars} = props
    const [nameText, setNameText] = useState(defaultText)

    useEffect(() => {
        visible && setNameText(defaultText)
    }, [visible])

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.input}>
                        <TextInput
                            // style={styles.input}
                            onChangeText={(newText) => setNameText(newText)}
                            value={nameText}
                            placeholder={defaultText}
                            maxLength={maxChars ? maxChars : 1000}
                            autoFocus={true}
                            selectTextOnFocus={true}
                        />
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.button}>
                            <Button
                                title={"Cancel"}
                                onPress={() => response(defaultText)}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title={"Save"}
                                onPress={() => response(nameText)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "70%",
        height: "50%",
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 1,
    },
    title: {
        textAlign: "center"
    },
    input: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        margin: 5,
    },
    buttons: {
        position: "absolute",
        bottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    button: {
        width: "40%"
    },
})

export default Prompt;