import React, {useState, useEffect, useContext} from 'react'
import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import PageTitle from '../../Components/Shared/PageTitle';
import Menu from '../../Components/Screens/EventScreen/Menu'
import Date from '../../Components/Screens/EventScreen/DateComponent';
import { ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { IdContext } from '../../utils/IdContext';
import General from '../../Components/Screens/EventScreen/General';
import Coming from '../../Components/Screens/EventScreen/Coming';
import TimeMsg from '../../Components/Screens/EventScreen/Schedules/TimeMsg';
import { LoginContext } from '../../utils/LoginProvider';

export default function EventScreen({navigation}) {
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState({})
    const { id } = useContext(IdContext)
    const { user }= useContext(LoginContext)
    useEffect(() => {
      const subscriber = firestore()
      .collection('events')
      .doc(id)
      .onSnapshot(doc => {
        setEvent({...doc.data()})
        setLoading(false)
      })
      return () => {subscriber}
    }, [])

    
    const head =  'ה'+ event.type +' של ' + event.firstN

    return (
      loading ? <ActivityIndicator style={{justifyContent: 'center', alignItems: 'center', flex: 1}} size={'large'}/> :
      <ScrollView style={{flex:1}}>
        <PageTitle name={head}/>
        <Date date={event.date} type={event.type}/>
        <Coming />
        <Menu event={event} navigation={navigation}/>
        {user && <TimeMsg />}
        {user && <General phone={event.phone} blocked={event.blocked}/>}
      </ScrollView>
    )
}

