import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale, fontScale } from 'react-native-utils-scale'
export default function Task({task, done, handleClick, row, id}) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => handleClick(row, id)}>
            <Icon style={{position: 'absolute',left: 9}} name={done ? 'checkbox-marked-outline' : 'checkbox-blank-outline'} size={30}/> 
            <Text style={[styles.task, done && {textDecorationLine: 'line-through'}]}>{task}</Text>           
        </TouchableOpacity>
        
        
    )
}

const styles = StyleSheet.create({
    task: {
        paddingHorizontal: 10,
        fontSize: fontScale(18),
        fontWeight: 'bold',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        position: 'absolute',
        borderWidth: 2, 
        borderColor: 'black',
        width: 25,
        height: 25,
    }
})
