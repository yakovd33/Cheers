import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';
import { scale, fontScale } from 'react-native-utils-scale'
export default function PageTitle({name}) {
    const { colors } = useTheme()
    return (
        <Text style={{...styles.title, color: colors.secondary}}>
            {name}
        </Text>

    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight:'bold',
        color: '#FF5487',
        fontSize: fontScale(30),
        paddingTop: 10,
        paddingStart: 10,
        writingDirection: 'rtl'
    },
})