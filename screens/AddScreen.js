import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import Entypo from 'react-native-vector-icons/Entypo'
import FirebaseUtil from '../utils/FirebaseUtils';
import FullForm from '../Components/Screens/AddScreen/FullForm';
import { createCheckList } from '../utils/Methods';
import Gender from '../Components/Screens/AddScreen/Gender';

export default function AddScreen({ navigation }) {
    const [firstN, setFirstN] = useState('');
    const [lastN, setLastN] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
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
        const event = {
            firstN: firstN,
            lastN: lastN,
            phone: phone,
            mail: mail,
            type: type,
            address: address,
            hall: hall,
            date: date,
            parents: parents,
            blocked: false,
            celebrator: {name: celebrator, gender: gender},
            checkList: createCheckList()
        }
        if (type=='חתונה') {
            event.partner = {name: partner, gender: partnerGender}
            event.partnerParents = partnerParents
        } else {
            event.brothers = partnerParents
        }
        FirebaseUtil.AddEvent(event,navigation)
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
        },{
            N: 'טלפון',
            I: <Icon name="phone" color={"#FF5487"} size={20} />,
            F: setPhone,
            V: phone,
            K: 'number-pad',
            key: 3,
        },{
            N: 'מייל',
            I: <Foundation name="mail" color={"#FF5487"} size={20} />, 
            F: setMail,
            V: mail,
            K: 'email-address',
            key: 4,
        }
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
        I: <Gender value={gender} setValue={setGender}/>,
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
        return () =>{
            setFirstN('')
            setLastN('')
            setPhone('')
            setAddress('')
            setMail('')
            setDate(new Date())
            setType('חתונה')
        }
    }, [])

    return (
        <FullForm 
            header={'הוסף אירוע'}
            userData={userData}
            eventData={eventData}
            additionalData={type=='חתונה' ? weddingData : bMitzva}
            date={date}
            setDate={setDate}
            type={type} 
            setType={setType}
            handleSubmit={handleSubmit}
            submitText={'הוסף'}
        /> 
  
    )
}