import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EmotionRow = (props) => {
    let [emotionCurr, setEmotionCurr] = useState("");

    // const emotion = (e) => {
    //     switch (e) {
    //         case "Neutral":
    //             return <EmotionRow emoji="😐" text="Neutral" />
    //             break;

    //     }
    // }
    return (
        <View style={styles.row}>
            <Text style={styles.txtE}>{props.emoji}</Text>
            <Text style={styles.txt}>{props.text}</Text>
            {/* <Text style={styles.txtE}>{emoji}</Text>
            <Text style={styles.txt}>{text}</Text> */}
        </View>
    )
}

export default EmotionRow

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    txt: {
        fontSize: windowHeight / 35,
        padding: 30,
        fontWeight: 'bold'
    },
    txtE: {
        fontSize: windowHeight / 15,
        padding: 30,
    }
})