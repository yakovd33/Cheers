import React from 'react'
import { Text,StyleSheet,TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from 'react-native-paper';
import { scale, fontScale } from 'react-native-utils-scale'

export default function EventInput({data, handleClick}) {
    const { colors } = useTheme();
    return (
        <TouchableOpacity style={styles.datePicker} onPress={() => handleClick()}>
            <Text style={{...styles.text, color: colors.primary}}>{data}</Text>
            <AntDesign name="caretdown" size={10} style={{color: colors.primary, paddingEnd: 10}}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    datePicker: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 20,
        width: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        padding: 5,
        fontSize: fontScale(15),
        fontWeight: 'bold',
    }
})