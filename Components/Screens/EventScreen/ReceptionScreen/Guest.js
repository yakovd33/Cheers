import React, { useContext, useState} from 'react'
import { View,Text, TouchableOpacity, useWindowDimensions, Image, Alert } from 'react-native'
import { Button, Modal, Portal, Searchbar, useTheme } from 'react-native-paper'
import { IdContext } from '../../../../utils/IdContext'
import ContactData from '../../../Shared/ContactData'
import EditContact from '../RsvpsScreen/EditContact'
import logo from '../../../../images/logo.png'
import FirebaseUtil from '../../../../utils/FirebaseUtils'

export default function Guest({ contact , tablesIds, search}) {
    const { colors } = useTheme()
    const width = useWindowDimensions().width
    const height = useWindowDimensions().height
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const { id } = useContext(IdContext)

    const [name, setName] = useState(contact.name)
    const [phone, setPhone] = useState(contact.phone)
    const [guests, setGuests] = useState(contact.guests)
    const [table, setTable] = useState(contact.table)

    const containerStyle = {backgroundColor: 'white',width: width / 1.1, height: height / 1.55, borderRadius: 10,};
    
    const handleClick = () => {
        if (table == '0') {
            Alert.alert('קבלת פנים', 'בחר שולחן עבור אורח',[{text: 'בחר'}])
        } else {
            FirebaseUtil.UpdateContact(id, contact.id, {name: name, phone:phone, guests:guests, table: parseInt(table), arrived: true})
            FirebaseUtil.SetTableSizes(id)
            search()
        }
        
    }
    return (
        <View>
            <TouchableOpacity onPress={() => showModal()} key={contact.id} style={{padding: 5}}>
                <Text style={contact.arrived === true && {color: 'green'}}>{contact.name} </Text>
            </TouchableOpacity>
            <Portal> 
                <Modal visible={visible} onDismiss={hideModal} style={{justifyContent: 'center', alignItems: 'center'}} contentContainerStyle={containerStyle}>
                    <Image source={logo} style={{width: 250,height: 180, alignSelf: 'center'}}></Image>
                    <ContactData 
                        guests={guests} setGuests={setGuests} 
                        name={name} setName={setName} 
                        phone={phone} setPhone={setPhone}
                        table={table} setTable={setTable}
                        tablesIds={tablesIds}
                    />
                    <Button mode='contained' onPress={() => handleClick()} style={{margin: 10}}><Text style={{color:'white'}}>הגיעו לאירוע</Text></Button>
                </Modal>
            </Portal>
        </View>
    )
}
