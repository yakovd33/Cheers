import { firebase } from '@react-native-firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { View, Text} from 'react-native'
import { useTheme } from 'react-native-paper'
import { IdContext } from '../../../../utils/IdContext'
import Card from '../../../Shared/Card'
import Schedule from './Schedule'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale, fontScale } from 'react-native-utils-scale'

export default function TimeMsg() {
    const { colors } = useTheme()
    const { id } = useContext(IdContext)
    const [first,setFirst] = useState()
    const [second,setSecond] = useState()
    const [reminder,setReminder] = useState()
    const [thanks,setThanks] = useState()
    const [onTheWay,setOnTheWay] = useState()

    const schedules = [{
            key: 'first',
            value: first,
            icon:  <FontAwesome size={27} color={'white'} name={'paper-plane'}/>,
            header: 'סבב ראשון',
            exp: 'הזמנה לכל המוזמנים',
            bonusExp: 'ישלח לכל האורחים שלא הופץ אליהם הזמנה',
        },{
            key: 'second',
            value: second,
            icon: <FontAwesome size={27} color={'white'} name={'paper-plane'}/>,
            header: 'סבב שני',
            exp: 'הזמנה לכל מי שלא ענה',
            bonusExp: 'ישלח לכל האורחים שהופצה אליהם הזמנה ולא ענו',
        },{
            key: 'reminder',
            value: reminder,
            icon: <MaterialCommunityIcons size={27} color={'white'} name={'alarm'}/>,
            header: 'סבב תזכורת',
            exp: 'תזכורת לכל מי שמגיע',
            bonusExp: 'ישלח לכל האורחים שמגיעים או אולי מגיעים',
        },{
            key: 'thanks',
            value: thanks,
            icon: <FontAwesome size={27} color={'white'} name={'thumbs-up'}/>,
            header: 'סבב תודות',
            exp: 'הודעה לכל מי שהגיע',
            bonusExp: 'לכל מי שהגיע לאירוע',
        },{
            key: 'onTheWay',
            value: onTheWay,
            icon: <MaterialCommunityIcons size={27} color={'white'} name={'table-chair'}/>,
            header: 'סבב "בדרך"',
            exp: 'מספר שולחן לכל מי שמגיע',
            bonusExp: 'ישלח לכל האורחים שמגיעים או אולי מגיעים',
        },
    ]
    useEffect(() => {
        const subscriber = 
        firebase
        .firestore()
        .collection('schedules')
        .doc(id)
        .onSnapshot((doc) => {
            setFirst(doc.data().first)
            setSecond(doc.data().second)
            setReminder(doc.data().reminder)
            setThanks(doc.data().thanks)
            setOnTheWay(doc.data().onTheWay)

        })
        return () => {subscriber()}  
    }, [])
    return (
        <View style={{marginHorizontal: 15}}>
            <Card>
                <Text style={{textAlign: 'center', fontSize: fontScale(30), color: colors.primary, padding: 10}}>תזמוני הודעות</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {schedules.map(schedule => <Schedule schedule={schedule} key={schedule.key}/>)}
                    
                </View>
            </Card>
        </View>
    )
}
