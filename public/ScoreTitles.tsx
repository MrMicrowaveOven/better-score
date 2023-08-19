import React, { useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Prompt from './Prompt'

const ScoreTitles = () => {
    const [team1Name, setTeam1Name] = useState<string>("Team 1")
    const [team2Name, setTeam2Name] = useState<string>("Team 2")
    const [renamingTeam, setRenamingTeam] = useState<null | 1 | 2>(null)

    const renameTeam = (newName : string) => {
        renamingTeam === 1
          ? setTeam1Name(newName)
          : setTeam2Name(newName)
        setRenamingTeam(null)
      }

    return (
        <View style={styles.scoreTitles}>
            <TouchableWithoutFeedback onLongPress={() => setRenamingTeam(1)} onPress={() => {}}>
                <Text style={styles.scoreTitle} adjustsFontSizeToFit={true} numberOfLines={1}>
                    {team1Name}
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onLongPress={() => setRenamingTeam(2)} onPress={() => {}}>
                <Text style={styles.scoreTitle} adjustsFontSizeToFit={true} numberOfLines={1}>
                    {team2Name}
                </Text>
            </TouchableWithoutFeedback>
            <Prompt
                title={renamingTeam !== null ? `Rename ${renamingTeam === 1 ? team1Name : team2Name}` : ""}
                visible={renamingTeam !== null}
                response={(newName : string) => renameTeam(newName)}
                defaultText={renamingTeam !== null ? (renamingTeam === 1 ? team1Name : team2Name) : ""}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    scoreTitles: {
        width: "100%",
        marginTop: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    scoreTitle: {
        fontSize: 25,
        color: "black",
        margin: 5
    },
})

export default ScoreTitles;