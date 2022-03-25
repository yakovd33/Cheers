import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Card from '../../Shared/Card'
// import functions from '@react-native-firebase/functions';
import functions from '@react-native-firebase/functions'
import { firebase } from '@react-native-firebase/firestore';
import { scale, fontScale } from 'react-native-utils-scale'
import { useTheme } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


export default function Balance() {
    const { colors } = useTheme() 
    const [balance, setBalance] = useState('100000')
    useEffect(() => {
        functions().httpsCallable('getBalance')()
        const subscriber = 
        firebase
        .firestore()
        .collection('general')
        .doc('balance')
        .onSnapshot(snapshot => {
            setBalance(snapshot.data().balance)
        })
        return () => {subscriber()}
    }, [])

    return (
        <Card>
            <View style={{flexDirection:'row', padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5 name={'sms'} size={40} color={colors.primary} style={{marginHorizontal: 10,}}/>
                <Text style={{fontSize: fontScale(25), fontWeight: 'bold', color: colors.primary}}>בנק הודעות:   </Text>
                <Text style={{fontSize: fontScale(40), fontWeight: 'bold', color: colors.primary}}>{balance}</Text>
            </View>
        </Card>
    )
}
