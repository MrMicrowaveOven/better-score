import React from "react";
import type {PropsWithChildren} from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type LineUpButtonProps = PropsWithChildren<{
    text: string;
    onPress: Function;
}>

const LineUpButton = ({text, onPress}: LineUpButtonProps) =>
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>

const styles = StyleSheet.create({
    button: {
        width: 125,
        height: 50,
        borderRadius: 5,
        backgroundColor: "#fdda00",
        borderWidth: 1,
        borderColor: "black",
        borderStyle: "solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    text: {
        fontSize: 18,
        textAlign: "center"
    }
})

export default LineUpButton