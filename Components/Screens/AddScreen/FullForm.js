import React from 'react'
import { ScrollView,View,Text, } from 'react-native'
import PageTitle from '../../Shared/PageTitle'
import UserDataForm from './UserDataForm'
import EventDataForm from './EventDataForm'
import { Button } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function FullForm({header,userData,eventData,additionalData,date,setDate,type,setType, handleSubmit, submitText}) {
    return (
        <ScrollView>
            <PageTitle name={header}/>
            <UserDataForm userData={userData} header="פרטי לקוח" />
            <EventDataForm eventData={eventData} date={date} setDate={setDate} type={type} setType={setType}/>
            <UserDataForm userData={additionalData} header="פרטים נוספים"/>
            <View style={{alignItems:'center', padding: 10,}}>
                <Button icon={() => <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={20} color='white' />} mode="contained" onPress={() => handleSubmit()}>
                    <Text style={{color: 'white'}}>{submitText}</Text>
                </Button>
            </View>
        </ScrollView>
    )
}
