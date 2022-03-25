import React, { useState, useEffect,useContext } from 'react'
import {ActivityIndicator } from 'react-native-paper';
import Gender from '../../Components/Screens/AddScreen/Gender'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import FirebaseUtil from '../../utils/FirebaseUtils'
import FullForm from '../../Components/Screens/AddScreen/FullForm';
import { IdContext } from '../../utils/IdContext';


export default function UpdateEventScreen({route, navigation}) {
    const { event } = route.params;
    const { id } = useContext(IdContext)
    const [loading, setLoading] = useState(true)
    const [firstN, setFirstN] = useState('');
    const [lastN, setLastN] = useState('');
    const [type, setType] = useState('חתונה')
    const [address, setAddress] = useState('');
    const [hall, setHall] = useState('');
    const [date, setDate] = useState(new Date());
    const [partner, setPartner ] = useState('')
    const [parents, setParents ] = useState('')
    const [partnerParents, setPartnerParents] = useState('')
    const [celebrator, setCelebrator] = useState('')
    const [gender, setGender] = React.useState('כלה');
    const [partnerGender, setPartnerGender] = React.useState('חתן');
    
    const handleSubmit = () =>{
        const newEvent = {
            firstN: firstN,
            lastN: lastN,
            phone: event.phone,
            mail: event.mail,
            blocked: event.blocked,
            type: type,
            address: address,
            hall: hall,
            date: date,
            parents: parents,
            celebrator: {name: celebrator, gender: gender},
            checkList: event.checkList
        }
        if (type=='חתונה') {
            newEvent.partner = {name: partner, gender: partnerGender}
            newEvent.partnerParents = partnerParents
        } else {
            newEvent.brothers = partnerParents
        }
        FirebaseUtil.UpdateEvent(newEvent, id, navigation)
    }
 

    const userData = [{
            N: 'שם פרטי',
            I: <FontAwesome name="user" color={"#FF5487"} size={20} />,
            F: setFirstN,
            V: firstN,
            K: null,
            key: 1,
        },{
            N: 'שם משפחה',
            I: <FontAwesome name="users" color={"#FF5487"} size={20} />,
            F: setLastN,
            V: lastN,
            K: null,
            key: 2,
        },
    ]

    const eventData = [{
            N: 'כתובת',
            I: <Entypo name="address" color={"#FF5487"} size={20}/>,
            F: setAddress,
            V: address,
            K: null,
            key: 1,
        },{
            N: 'שם אולם',
            I: <MaterialCommunityIcons name="home-map-marker" color={"#FF5487"} size={25}/>,
            F: setHall,
            V: hall,
            K: null,
            key: 2,
        }
    ]

    const weddingData = [{
            N: 'אני',
            I: <Gender value={gender} setValue={setGender}/>,
            F: setCelebrator,
            V: celebrator,
            K: null,
            key: 1,
        },{
            N: 'החצי השני שלי',
            I: <Gender value={partnerGender} setValue={setPartnerGender}/>,
            F: setPartner,
            V: partner,
            K: null,
            key: 2,
        },{
            N: 'שמות ההורים',
            I: <MaterialIcons name="family-restroom" color={"#FF5487"} size={20}/>,
            F: setParents,
            V: parents,
            K: null,
            key: 3,
        },{
            N: 'הורי החצי השני',
            I: <MaterialIcons name="family-restroom" color={"#FF5487"} size={20}/>,
            F: setPartnerParents,
            V: partnerParents,
            K: null,
            key: 4,
        },
    ]
    const bMitzva = [{
            N: 'שם החוגג/ת',
            I: <Gender value={gender} setValue={setGender} />,
            F: setCelebrator,
            V: celebrator,
            K: null,
            key: 1,
        },{
            N: 'שמות ההורים',
            I: <MaterialIcons name="family-restroom" color={"#FF5487"} size={20}/>,
            F: setParents,
            V: parents,
            K: null,
            key: 2,
        },{
            N: 'שמות האחים',
            I: <Foundation name="male-female" color={"#FF5487"} size={20}/>,
            F: setPartnerParents,
            V: partnerParents,
            K: null,
            key: 3,
        },
    ]

    useEffect(() => {
        setFirstN(event.firstN)
        setLastN(event.lastN)
        setAddress(event.address)
        setDate(event.date.toDate())
        setType(event.type)
        setParents(event.parents)
        setCelebrator(event.celebrator.name)
        setGender(event.celebrator.gender)
        setHall(event.hall)
        if (event.type == 'חתונה') {
            setPartner(event.partner.name)
            setPartnerGender(event.partner.gender)
            setPartnerParents(event.partnerParents) 
        } else {
            setPartnerParents(event.brothers) 
        }
        setLoading(false)
        return () => {}
    }, [])
    
    return (
        !loading ? 
        <FullForm 
            header={'עדכן אירוע'}
            userData={userData}
            eventData={eventData}
            additionalData={type=='חתונה' ? weddingData : bMitzva}
            date={date}
            setDate={setDate} 
            type={type} 
            setType={setType}
            handleSubmit={handleSubmit}
            submitText={'עדכן'}
        /> : <ActivityIndicator size={'large'} style={{flex: 1,justifyContent: 'center', alignItems:'center'}}/>
    
    )
}
