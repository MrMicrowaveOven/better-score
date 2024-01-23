import React, { PropsWithChildren } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TopMenuProps = PropsWithChildren<{
    left?: string;
    leftAction?: Function;
    center?: string;
    centerAction?: Function;
    right?: string;
    rightAction?: Function;
    backgroundColor?: string;
}>;

const TopMenu = ({left, leftAction, center, centerAction, right, rightAction, backgroundColor}: TopMenuProps) => {
    return (
        !center && !centerAction
            ?   right && rightAction && !left && !leftAction
                ? <RightMenu right={right} rightAction={rightAction} alone={true}/>
                : <LeftMenu left={left} leftAction={leftAction} alone={true}/>
            :   leftAction && centerAction && rightAction && 
                    <View style={[styles.body, !left && {justifyContent: "flex-end"}]}>
                        <TouchableOpacity style={styles.left} onPress={() => leftAction()}>
                            <Image source={require("../images/arrowLeft.png")} style={styles.leftArrow}/>
                            <Text style={styles.leftText}>{left}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.center} onPress={() => centerAction()}>
                            <Text style={styles.centerText}>{center}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.right} onPress={() => rightAction()}>
                            <Text style={styles.rightText}>{right}</Text>
                            <Image source={require("../images/arrowRight.png")} style={styles.rightArrow}/>
                        </TouchableOpacity>
                    </View>
    )
}

const LeftMenu = ({left, leftAction, alone}: any) => {
    return(
        <TouchableOpacity style={[styles.left, alone && styles.alone]} onPress={() => leftAction()}>
            <Image source={require("../images/arrowLeft.png")} style={styles.leftArrow}/>
            <Text style={styles.leftText}>{left}</Text>
        </TouchableOpacity>
    )
}

const RightMenu = ({right, rightAction, alone}: any) => {
    return(
        <View style={styles.rightContainer}>
            <TouchableOpacity style={[styles.right, alone && styles.alone]} onPress={() => rightAction()}>
                <Text style={styles.rightText}>{right}</Text>
                <Image source={require("../images/arrowRight.png")} style={styles.rightArrow}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        display: "flex",
        flexDirection: "row",
    },
    left: {
        width: "30%",
        height: 30,
        backgroundColor: "#fdda00",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRightColor: "#000500",
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderBottomColor: "#000500",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
    },
    leftText: {
        color: "#000500",
    },
    leftArrow: {
        width: 20,
        height: 20,
    },
    center: {
        backgroundColor: "#fdda00",
        width: "40%",
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#000500",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
    },
    centerText: {
        color: "#000500",
    },
    rightContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
    },
    right: {
        width: "30%",
        height: 30,
        backgroundColor: "#fdda00",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderLeftColor: "#000500",
        borderLeftWidth: 1,
        borderLeftStyle: "solid",
        borderBottomColor: "#000500",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
    },
    rightText: {
        color: "#000500",
    },
    rightArrow: {
        width: 20,
        height: 20,
    },
    alone: {
        width: "35%"
    }
})

export default TopMenu;