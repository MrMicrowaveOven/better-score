import React, { PropsWithChildren, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type CheckboxProps = PropsWithChildren<{
    onChange: Function;
    defaultChecked: boolean;
}>;

const Checkbox = ({onChange, defaultChecked}: CheckboxProps) => {
    const [checked, setChecked] = useState<boolean>(defaultChecked)

    useEffect(() => {
        onChange(checked)
    }, [checked])

    return (
        <TouchableOpacity style={[styles.box, checked && styles.checkedBox]} onPress={() => setChecked(!checked)}>
            <View>
                {checked &&
                    <View>
                        <View style={[styles.diagonalLine, styles.diagonalLine1]}></View>
                        <View style={[styles.diagonalLine, styles.diagonalLine2]}></View>
                    </View>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 20,
        height: 20,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        display: "flex",
        justifyContent: "center"
    },
    checkedBox: {
    },
    diagonalLine: {
        width: 23,
        height: 3,
        backgroundColor: "black",
    },
    diagonalLine1: {
        transform: [{translateX: -4},{rotate: '45deg'}]
    },
    diagonalLine2: {
        transform: [{translateX: -4}, {rotate: '135deg'}]
    }
})

export default Checkbox