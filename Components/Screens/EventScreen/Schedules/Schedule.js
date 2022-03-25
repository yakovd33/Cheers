import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Pressable, useWindowDimensions} from 'react-native'
import { useTheme, Portal, Modal, Avatar } from 'react-native-paper'
import { IdContext } from '../../../../utils/IdContext';
import { dateToString } from '../../../../utils/Methods';
import ScheduleModal from './ScheduleModal';
import { scale, fontScale } from 'react-native-utils-scale'

export default function Schedule({schedule}) {
    const { colors } = useTheme()
    const { id } = useContext(IdContext)
    const height = useWindowDimensions().height;
    const width = useWindowDimensions().width;
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [visible,setVisible] = useState(false)
    const containerStyle = {backgroundColor: 'white',width: width / 1.4, height: height / 1.75, borderRadius: 5,};

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', padding: scale(5)}}>
            <Avatar.Icon size={50} icon={() => schedule.icon} />
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                <Text style={{fontWeight: 'bold', color: colors.primary, fontSize: fontScale(20)}}>{schedule.header}</Text>
                <Text style={{fontSize: fontScale(15)}}> - שליחת</Text>
            </View>
            <Text style={{fontSize: fontScale(15)}}>{schedule.exp}</Text>
            <Text style={{color: colors.primary, fontWeight: 'bold', padding: 5}}>{schedule.value !== undefined ? 'מתזומן: ' +  dateToString(schedule.value.toDate()) : 'לא נבחר תזמון'}</Text>
            <Pressable onPress={() => showModal()} style={{padding: 8, borderRadius: 50, backgroundColor: colors.primary, marginVertical: 5}}>
                <Text style={{color: 'white', fontSize: fontScale(15)}}>  בחר תזמון  </Text>
            </Pressable>
            
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} style={{justifyContent: 'center', alignItems: 'center'}} contentContainerStyle={containerStyle}>
                    <ScheduleModal schedule={schedule} hideModal={hideModal} id={id}/>
                </Modal>
            </Portal>
        </View>
    )
}
