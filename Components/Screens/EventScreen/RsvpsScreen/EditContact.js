import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import { TextInput, useTheme, Menu, Button } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import logo from '../../../../images/logo.png'
import Card from '../../../Shared/Card'
import EventInput from '../../AddScreen/EventInput'
import { fixPhone } from '../../../../utils/Methods'
import FirebaseUtil from '../../../../utils/FirebaseUtils'
import { scale, fontScale } from 'react-native-utils-scale'

export default function EditContact({ hideModal, contact, id }) {
    const { colors } = useTheme()
    const [name, setName] = useState(contact.name)
    const [phone, setPhone] = useState(contact.phone)
    const [guests, setGuests] = useState(contact.guests)
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    
    let arr = []
    for (let index = 0; index < 16; index++) {
        arr.push(<Menu.Item key={index} onPress={() => {closeMenu(), setGuests(index)}} title={index} />)   
    }
    const handleClick = () => {
        openMenu()
    }
    
    return (
        <View style={{flex: 1, justifyContent: 'space-around', marginHorizontal: 5}}>
             <TouchableOpacity style={{}} onPress={() => hideModal()} >
                 <Feather name={'x-square'} size={35} color={colors.primary} />
             </TouchableOpacity>
             <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={logo} style={{width: 250,height: 180,}}></Image>
             </View>
             <View style={{marginHorizontal: 15, marginVertical: 10}}>
                <Card>      
                    <View style={{justifyContent: 'center',}}>
                    <TextInput 
                        label={'שם פרטי'}
                        value={name}
                        onChangeText={text => setName(text)}
                        style={{textAlign: 'right',textAlignVertical: 'center', backgroundColor: 'white', height: 50}}
                        right={<TextInput.Icon name={() => <FontAwesome size={20} color={colors.primary} name={'user'}/>} />}
                    />
                    <TextInput 
                        label={'מספר טלפון'}
                        value={phone}
                        keyboardType={'number-pad'}
                        onChangeText={text => setPhone(text)}
                        style={{textAlign: 'right',textAlignVertical: 'center', backgroundColor: 'white', height: 50}}
                        right={<TextInput.Icon name={() => <MaterialCommunityIcons name="phone" color={colors.primary} size={20} />} />}
                    />
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                            <View style={{alignItems: 'center', margin: 10, }}>
                                <Text style={{fontSize: fontScale(16), fontWeight: 'bold', padding: 5, color: colors.secondary}}>כמות אורחים :</Text>
                                <EventInput handleClick ={handleClick} data={guests}/>
                            </View>}
                        >
                            {arr}
                        </Menu>
                        <Button 
                            contentStyle={{flexDirection: 'row-reverse'}} 
                            icon={() => (<Icon size={30} name={'group-add'} color={'white'}/>)} 
                            mode="contained" 
                            onPress={() => {
                                FirebaseUtil.UpdateContact(id, contact.id, {name: name, phone: fixPhone(phone), guests: guests})
                                hideModal();
                            }}
                        >
                            <Text style={{color: 'white', fontSize: fontScale(20),}}>עדכן</Text>
                        </Button>
                    </View>     
                </Card>
            </View>
        </View>
          
    )
}
