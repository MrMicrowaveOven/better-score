import React, { PropsWithChildren, useState } from 'react'
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Prompt from './Prompt'

type ScoreTitlesProps = PropsWithChildren<{
    screenLocked: boolean;
    setTeamName: Function;
    team1Name: string;
    team2Name: string;
    swapTeams: Function;
}>

const ScoreTitles = ({screenLocked, setTeamName, team1Name, team2Name, swapTeams}: ScoreTitlesProps) => {
    const [renamingTeam, setRenamingTeam] = useState<null | 1 | 2>(null)

    const renameTeam = (newName : string) => {
        setTeamName(renamingTeam, newName)
        setRenamingTeam(null)
    }

    const scoreTitleFontSize = (teamNumber : number) => {
        const screenWidth = Dimensions.get('window').width;
        const textWidth = screenWidth / 2
        const teamNameLength = teamNumber === 1 ? team1Name.length : team2Name.length
        const minimumFontSize = 25
        const fontSize = Math.sqrt(textWidth*25/teamNameLength)
        return Math.min(fontSize, minimumFontSize)
    }

    const confirmSwapTeams = () => {
        Alert.alert("Swap Teams?",
            "Are you sure you want to swap the red and green teams?", [
                { text: "No", onPress: () => {} },
                { text: "Yes", onPress: () => swapTeams() }
            ]
        )
    }


    return (
        <View style={styles.scoreTitles}>
            <TouchableHighlight style={styles.scoreTitle} onLongPress={() => !screenLocked && setRenamingTeam(1)} onPress={() => {}}>
                <Text style={[styles.scoreTitleText, {fontSize: scoreTitleFontSize(1)}]} adjustsFontSizeToFit={true} numberOfLines={1}>
                    {team1Name}
                </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => confirmSwapTeams()} style={styles.swapIconContainer}>
                <Image source={require('../images/swap.png')} style={styles.swapIcon}/>
            </TouchableHighlight>
            <TouchableHighlight style={styles.scoreTitle} onLongPress={() => !screenLocked && setRenamingTeam(2)} onPress={() => {}}>
                <Text style={[styles.scoreTitleText, {fontSize: scoreTitleFontSize(2)}]} adjustsFontSizeToFit={true} numberOfLines={1}>
                    {team2Name}
                </Text>
            </TouchableHighlight>
            <Prompt
                title={renamingTeam !== null ? `Rename ${renamingTeam === 1 ? team1Name : team2Name}` : ""}
                visible={renamingTeam !== null}
                response={(newName : string) => renameTeam(newName)}
                defaultText={renamingTeam !== null ? (renamingTeam === 1 ? team1Name : team2Name) : ""}
                maxChars={1000}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scoreTitles: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center",
        height: 45,
        backgroundColor: "#000500"
    },
    scoreTitle: {
        width: "50%"
    },
    scoreTitleText: {
        textAlign: "center",
        color: "#fdda00",
        margin: 5,
    },
    swapIconContainer: {
        zIndex: 1,
    },
    swapIcon: {
        height: 20,
        width: 20
    }
})

export default ScoreTitles;