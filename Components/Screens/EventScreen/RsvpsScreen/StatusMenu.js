import React, {useState} from 'react'
import { TouchableOpacity,View, Text } from 'react-native';
import { Menu } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FirebaseUtil from '../../../../utils/FirebaseUtils';

export default function StatusMenu({ contact, id }) {
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    
    const icons = {
        'מגיע': <AntDesign size={20} color={'green'} name={'check'} />,
        'לא מגיע': <Feather size={20} color={'red'} name={'x'} />,
        'נשלחה הודעה': <FontAwesome size={20} color={'grey'} name={'paper-plane'}/>,
        'לא ענה': <Feather size={20} color={'gold'} name={'phone-off'} />,
        'אולי מגיע': <AntDesign size={20} color={'blue'} name={'question'} />,
        'לא הופץ': <MaterialCommunityIcons size={20} color={'red'} name={'email-off'} />,
        'תקלה': <MaterialIcons size={20} color={'red'} name={'error-outline'} />,
    }

    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<TouchableOpacity onPress={openMenu}>{icons[contact.status]}</TouchableOpacity>}
            >
                <Menu.Item onPress={() => {closeMenu(), FirebaseUtil.UpdateContact(id, contact.id,{status: 'מגיע'})}} title={<Text>{icons['מגיע']}   מגיע</Text>} />
                <Menu.Item onPress={() => {closeMenu(), FirebaseUtil.UpdateContact(id, contact.id,{status: 'לא מגיע'})}} title={<Text>לא מגיע   {icons['לא מגיע']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), FirebaseUtil.UpdateContact(id, contact.id,{status: 'נשלחה הודעה'})}} title={<Text>נשלחה הודעה   {icons['נשלחה הודעה']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), FirebaseUtil.UpdateContact(id, contact.id,{status: 'לא ענה'})}} title={<Text>לא ענה   {icons['לא ענה']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), FirebaseUtil.UpdateContact(id, contact.id,{status: 'אולי מגיע'})}} title={<Text>אולי מגיע   {icons['אולי מגיע']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), FirebaseUtil.UpdateContact(id, contact.id,{status: 'לא הופץ'})}} title={<Text>לא הופץ   {icons['לא הופץ']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), FirebaseUtil.UpdateContact(id, contact.id,{status: 'תקלה'})}} title={<Text>תקלה   {icons['תקלה']}</Text>}/>
            </Menu>
        </View>
        
    )
}
