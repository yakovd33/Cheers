import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Avatar, useTheme } from 'react-native-paper'
import Card from './Card'
import Feather from 'react-native-vector-icons/Feather'
import FirebaseUtil from '../../utils/FirebaseUtils'
import { firebase } from '@react-native-firebase/firestore';
import { fontScale } from 'react-native-utils-scale'
import { IdContext } from '../../utils/IdContext'
import { numGuests } from '../../utils/Methods';
import { LoginContext } from '../../utils/LoginProvider'

export default function Count() {
    const { colors } = useTheme()
    const [arrived, setArrived] = useState(0)
    const [byHandArrived, setByHandArrived] = useState(0)
    const { id } = useContext(IdContext)
    const { user } = useContext(LoginContext)
    useEffect(() => {
        const subscriber = 
        firebase
        .firestore()
        .collection('live')
        .doc(id)
        .onSnapshot(snapshot => {
            setByHandArrived(snapshot.data().count)
        })
        return () => {subscriber()}
    }, [])
    
    useEffect(() => {
        const subscriber = 
        firebase
        .firestore()
        .collection('contacts')
        .doc(id)
        .collection('contacts')
        .where('arrived', '==', true)
        .onSnapshot(snapshot => {
            setArrived(numGuests(snapshot.docs.map(doc => doc.data())))
        })
        return () => {subscriber()}
    }, [])

    return (
        <Card>
            <Text style={{fontSize: fontScale(25), padding: 10, color: colors.primary, fontWeight: 'bold', writingDirection: 'rtl'}}>מספר אנשים באולם</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                {/* {user && <TouchableOpacity onPress={() => FirebaseUtil.UpdateLiveCount(id, byHandArrived + 1)}>
                    <Avatar.Icon size={70} icon={() => <Feather name={'plus'} color='white' size={70}/>} />
                </TouchableOpacity>} */}
                <Text style={{fontWeight: 'bold', color: colors.primary, fontSize: fontScale(70)}}>{arrived + byHandArrived}</Text>
                {/* {user &&<TouchableOpacity onPress={() =>  {byHandArrived > 0 && FirebaseUtil.UpdateLiveCount(id,byHandArrived - 1)}}>
                    <Avatar.Icon size={70} icon={() => <Feather name={'minus'} color='white' size={70}/>} />
                </TouchableOpacity>} */}
            </View>
        </Card>
    )
}
