import React, { useState, useContext } from 'react'
import { TouchableOpacity, Text, useWindowDimensions, View} from 'react-native'
import { DataTable, Portal, useTheme, Modal } from 'react-native-paper';
import { callNumber } from '../../../../utils/Methods';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import StatusMenu from './StatusMenu';
import EditContact from './EditContact';
import { IdContext } from '../../../../utils/IdContext';
import FirebaseUtil from '../../../../utils/FirebaseUtils';
import { LoginContext } from '../../../../utils/LoginProvider';
import { scale, fontScale } from 'react-native-utils-scale'
import { showMessage } from "react-native-flash-message";

export default function TableRow({ contact, sendM }) {
    const { id } = useContext(IdContext)
    const { user } = useContext(LoginContext)
    const { colors } = useTheme()
    const height = useWindowDimensions().height;
    const width = useWindowDimensions().width;
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white',width: width / 1.1, height: height / 1.55, borderRadius: 10,};

    const onSendPress = () => {
        sendM(contact)
        if (user) {
            showMessage({
                message: "הודעה נשלחה",
                type: "success",
            });   
        }
    }
    return (
        <DataTable.Row>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start'}}>
                <TouchableOpacity onPress={() => FirebaseUtil.DeleteContact(id, contact.id)}>
                   <AntDesign size={20} name={'delete'} color={colors.primary}/>
                </TouchableOpacity>
            </View> 
            <View style={{flex: 2.5, justifyContent: 'center', alignItems: 'flex-start'}}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => showModal()}>
                    <Text>{contact.name}</Text>
                    <Text style={{fontSize: fontScale(13)}}>  (+{contact.guests}) </Text>   
                </TouchableOpacity>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} style={{justifyContent: 'center', alignItems: 'center'}} contentContainerStyle={containerStyle}>
                       <EditContact hideModal={hideModal} contact={contact} id={id}/>
                    </Modal>
                </Portal>
            </View>
            <View style={{flex: 2.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => onSendPress()}>
                   {user ? <AntDesign size={20} name={'message1'} color={colors.primary}/>
                   : <FontAwesome size={20} name={'whatsapp'} color={'green'}/> }
                </TouchableOpacity>
                <Text>   </Text>
                <TouchableOpacity onPress={() => callNumber(contact.phone)}>
                   <Feather size={20} name={'phone-call'} color={colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1.8, justifyContent: 'center'}}>
               <StatusMenu id={id} contact={contact}/>
            </View>    
        </DataTable.Row>
        
    )
}
