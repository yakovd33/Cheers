import React, {useState} from 'react'
import Card from '../../Shared/Card'
import { Text,View, StyleSheet} from 'react-native'
import DataInput from './DataInput'
import { Menu, useTheme } from 'react-native-paper';
import DateTimePickerCom from './DateTimePickerCom';
import ChooseType from './ChooseType';
import { scale, fontScale } from 'react-native-utils-scale'

export default function EventDataFrom({eventData, type, setType, date, setDate}) {
    const { colors } = useTheme()
    return (
        <View style={{marginHorizontal: 15, marginVertical: 10}}>
            <Card>
                <Text style={styles.title}>פרטי אירוע</Text>
                <View style={{borderBottomColor: colors.secondary ,borderBottomWidth: 1}}/>
                <ChooseType type={type} setType={setType} />
                <DateTimePickerCom header={'תאריך'} data={date} setData = {setDate} mode='date' />
                <DateTimePickerCom header={'קבלת פנים'} data={date} setData = {setDate} mode='time' />
                <DataInput userData={eventData} />
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