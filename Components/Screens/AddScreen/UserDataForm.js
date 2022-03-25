import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';
import Card from '../../Shared/Card';
import DataInput from './DataInput';
import { scale, fontScale } from 'react-native-utils-scale'
export default function UserDataForm({ userData, header }) {
    const { colors } = useTheme()
    return (
        <View style={{marginHorizontal: 15, marginVertical: 10}}>
            <Card>
                <Text style={styles.title}>{header}</Text>
                <View style={{borderBottomColor: colors.secondary,borderBottomWidth: 1}} />
                <DataInput userData={userData} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        paddingVertical: 10,
        paddingStart: 10,  
        fontSize: fontScale(20),
        writingDirection: 'rtl'
    },
})