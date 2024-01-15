import React, { PropsWithChildren, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Prompt from './Prompt'
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();

type ScoreTitlesProps = PropsWithChildren<{
    screenLocked: boolean;
    setTeamName: Function;
    team1Name: string;
    team2Name: string;
}>

const ScoreTitles = ({screenLocked, setTeamName, team1Name, team2Name}: ScoreTitlesProps) => {
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

    return (
        <View style={styles.scoreTitles}>
            <TouchableWithoutFeedback onLongPress={() => !screenLocked && setRenamingTeam(1)} onPress={() => {}}>
                <Text style={[styles.scoreTitle, {fontSize: scoreTitleFontSize(1)}]} adjustsFontSizeToFit={true} numberOfLines={1}>
                    {team1Name}
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onLongPress={() => !screenLocked && setRenamingTeam(2)} onPress={() => {}}>
                <Text style={[styles.scoreTitle, {fontSize: scoreTitleFontSize(2)}]} adjustsFontSizeToFit={true} numberOfLines={1}>
                    {team2Name}
                </Text>
            </TouchableWithoutFeedback>
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
        width: "50%",
        textAlign: "center",
        color: "#fdda00",
        margin: 5,
    },
})

export default ScoreTitles;