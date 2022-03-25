import React, { useContext } from 'react'
import { Pressable, StyleSheet, View, Text, Alert } from 'react-native'
import { useTheme } from 'react-native-paper'
import Card from '../../Shared/Card'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { IdContext } from '../../../utils/IdContext'
import { firebase } from '@react-native-firebase/functions';
import FirebaseUtil from '../../../utils/FirebaseUtils'
import { fontScale } from 'react-native-utils-scale'
import { showMessage } from "react-native-flash-message";


export default function General({phone, blocked}) {
    const { id } = useContext(IdContext)
    const { colors } = useTheme()
    const sendM = () => {
        showMessage({
            message: "הודעה נשלחה",
            type: "success",
        });   
        firebase.functions().httpsCallable('sendCode')({message: id, phone: phone})
    }

    const openAlert = () => {
        Alert.alert('איפוס רשימת מוזמנים', 'לאחר לחיצת המשך כל פרטי המוזמנים ימחקו', [
            {text: 'בטל'},{text: 'המשך', onPress: () => FirebaseUtil.DeleteContacts(id)},
        ])
    }
    return (
        <View style={{marginHorizontal: 15, marginVertical: 10}}>
            <Card>
                <Text style={{fontSize: fontScale(20), fontWeight: 'bold', padding: 5, writingDirection: 'rtl'}}>פעולות כלליות</Text>
                <Pressable style={{...styles.container, backgroundColor: colors.primary, }} onPress={() => sendM()}>
                    <MaterialIcons name='message' size={20} color='white' />
                    <Text style={{color: 'white', marginHorizontal: 5}}>שלח sms התחברות ללקוח</Text>
                </Pressable>
                <Pressable style={{...styles.container, backgroundColor: colors.primary}} onPress={() => openAlert()}>
                    <MaterialIcons name='refresh' size={20} color='white' />
                    <Text style={{color: 'white', marginHorizontal: 5}}>איפוס טבלת אישורי הגעה</Text> 
                </Pressable>
                <Pressable style={{...styles.container, backgroundColor: colors.primary}} onPress={() => FirebaseUtil.UpdateBlocked(id, !blocked)}>
                    <MaterialIcons name='block' size={20} color='white' />
                    <Text style={{color: 'white', marginHorizontal: 5}}>{!blocked ? 'חסום משתמש' : 'בטל חסימת משתמש'}</Text>  
                </Pressable>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        padding: 10,
        margin: 5,
        flexDirection: 'row', 
        justifyContent: 'center',
        width: 250
    }
})