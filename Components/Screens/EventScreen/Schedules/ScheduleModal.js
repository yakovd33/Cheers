import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useTheme, Avatar, Button } from 'react-native-paper'
import { View, Text } from 'react-native'
import DateTimePickerCom from '../../EventScreen/Schedules/DateTimePickerCom'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FirebaseUtil from '../../../../utils/FirebaseUtils'
import { scale, fontScale } from 'react-native-utils-scale'

export default function ScheduleModal({ hideModal, id,schedule }) {
    const [date, setDate] = useState(schedule.value != undefined ? schedule.value.toDate() : new Date())
    const { colors } = useTheme()

    const createSchedule = () => {
        const object = {}
        console.log(date)
        object[schedule.key] = date
        console.log(object)

        return object
    }

    return (
        <View style={{flex: 1}}>
            <Avatar.Icon style={{margin: 15, alignSelf: 'center'}} size={60} icon={() => <FontAwesome size={32} color={'white'} name={'paper-plane'}/>} />
            <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', color: colors.primary, fontSize: fontScale(22)}}>{schedule.header}</Text>
                    <Text style={{fontSize: fontScale(18)}}> - שליחת</Text>
                </View>
                <Text style={{fontSize: fontScale(18)}}>{schedule.exp}</Text>
                <Text style={{fontWeight: 'bold', paddingTop: 4, color: colors.primary, fontSize: fontScale(22)}}>בחירת תזמון</Text>
            </View>

            <DateTimePickerCom data={date} setData = {setDate} mode='date' />
            <DateTimePickerCom data={date} setData = {setDate} mode='time' />
            <Button style={{margin: 18}} 
                icon={() => <Fontisto name={'save'} color='white' size={20} />} 
                mode="contained" 
                onPress={() => {FirebaseUtil.UpdateSchedule(id,createSchedule()); hideModal()}}>
                <Text style={{color: 'white', fontSize: fontScale(15)}}>שמור תזמון</Text>
            </Button>
            <Text style={{alignSelf: 'center'}}>({schedule.bonusExp})</Text>
        </View>
        
    )
}
