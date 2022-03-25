import { firebase } from '@react-native-firebase/firestore'
import React, { useEffect, useState } from 'react'
import { View,Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { dateToString, dateToTimeString } from '../../../utils/Methods'

export default function Round() {
    const [round, setRound] = useState(undefined)
    const [event, setEvent] = useState(undefined)
    const { colors } = useTheme()
    useEffect(() => {
        
        const subscription = firebase
        .firestore()
        .collection('general')
        .doc('round')
        .onSnapshot(doc => setRound(doc.data()))
        return () => {subscription()}
    }, [])

    useEffect(() => { 
        const fetchData = async () => {
            if (round !== undefined) {
                const event1 = await firebase
                .firestore()
                .collection('events')
                .doc(round.id)
                .get()
                setEvent(event1.data())
            }
        }
        fetchData()
        return () => {}
    }, [round])

    return (
        event !== undefined && 
        <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
            <Text style={{marginVertical: 10, fontSize: 20, color: colors.primary}}>נשלח {round.type} ל{event.type} של {event.firstN}</Text>
            <Text style={{fontSize: 20, color: colors.primary}}>{dateToTimeString(round.time.toDate())} - {dateToString(round.time.toDate())}</Text>
        </View>
    )
}
