import React, {useState} from 'react'
import { View, Text,StyleSheet, TouchableOpacity , Image, useWindowDimensions} from 'react-native'
import { useTheme , Portal, Modal } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import logo from '../../../../images/logo.png'
import AddContacts from './AddContacts'
import ByHand from './ByHand'
import Excel from './Excel'
import { scale, fontScale } from 'react-native-utils-scale'

export default function AddComponent({ hideModal,id }) {
    const { colors } = useTheme()
    const height = useWindowDimensions().height;
    const width = useWindowDimensions().width;
    const [contactsVisible, setContactsVisible] = useState(false);
    const [byHandVisible, setByHandVisible] = useState(false);
    const [excelVisible, setExcelVisible] = useState(false);
    const showExcelModal = () => setExcelVisible(true);
    const hideExcelModal = () => setExcelVisible(false);

    const showByHandModal = () => setByHandVisible(true);
    const hideByHandModal = () => setByHandVisible(false);

    const showContatcsModal = () => setContactsVisible(true);
    const hideContactsModal = () => setContactsVisible(false);

    const containerStyle = {backgroundColor: 'white',width: width / 1.1, height: height / 1.55, borderRadius: 10,};
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => hideModal()} >
                <Feather name={'x-square'} size={35} color={colors.primary} />
            </TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={logo} style={{width: 269,height: 180,}}></Image>
            </View>
            <View>
            <TouchableOpacity onPress={() => showByHandModal()} style={{...styles.button, backgroundColor: colors.primary}}>
                <AntDesign name={'adduser'} size={35} color={'white'} />
                <Text style={styles.text}>הוסף מוזמנ/ת ידני</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showContatcsModal()} style={{...styles.button, backgroundColor: colors.primary}}>
                <AntDesign name={'contacts'} size={35} color={'white'} />
                <Text style={styles.text}>הוסף מוזמנ/ת מאנשי קשר</Text>     
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showExcelModal()} style={{...styles.button, backgroundColor: colors.primary}}>
                <MaterialCommunityIcons name={'microsoft-excel'} size={35} color={'white'} />
                <Text style={styles.text}>הוסף מוזמנים מטבלת אקסל</Text>    
            </TouchableOpacity>
            </View>    


            <Portal>
                <Modal visible={byHandVisible} onDismiss={hideByHandModal} style={{justifyContent: 'center', alignItems: 'center'}} contentContainerStyle={containerStyle}>
                    <ByHand hideModal={hideByHandModal} id={id}/>
                </Modal>
            </Portal>

            <Portal>
                <Modal visible={excelVisible} onDismiss={hideExcelModal} style={{justifyContent: 'center', alignItems: 'center'}} contentContainerStyle={containerStyle}>
                    <Excel hideModal={hideExcelModal} id={id}/>
                </Modal>
            </Portal>

            <Portal>
                <Modal visible={contactsVisible} onDismiss={hideContactsModal} style={{justifyContent: 'center', alignItems: 'center'}} contentContainerStyle={containerStyle}>
                    <AddContacts hideModal={hideContactsModal} id={id}/>
                </Modal>
            </Portal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        justifyContent: 'space-around',
        flex: 1,
    },
    button: {
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5,
    }, 
    text: {
        color: 'white',
        padding: 5,
        fontSize: fontScale(20),
        fontWeight: 'bold'
    }
})