import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Btn = (props) => {
    return (
        <View style={styles.btn}>
            {/* <TouchableOpacity activeOpacity={0.5}> */}
            <Text style={styles.txt}>{props.text}</Text>
            {/* </TouchableOpacity> */}
        </View>
    )
}

export default Btn

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: windowHeight / 5,
        height: windowHeight / 5,
        borderRadius: windowHeight / 2,
        borderColor: 'black',
        backgroundColor: '#5ba2f4',
        // backgroundColor: props.bgColor,

        borderWidth: 4,

    },
    txt: {
        letterSpacing: 2,
        fontWeight: 'bold',
        fontSize: windowHeight / 30,
    }
})