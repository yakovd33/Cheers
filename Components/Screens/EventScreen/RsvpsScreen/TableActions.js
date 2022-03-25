import React, {useState, useContext} from 'react'
import { View, Text,TouchableOpacity, StyleSheet, useWindowDimensions} from 'react-native'
import { useTheme, Portal, Modal } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { IdContext } from '../../../../utils/IdContext'
import AddComponent from './AddComponent'
import Filter from './Filter'
import Requests from './Requests'
import { scale, fontScale } from 'react-native-utils-scale'

export default function TableActions({ setFilter, setRequest }) {
    const { id } = useContext(IdContext)
    const { colors } = useTheme()
    const height = useWindowDimensions().height;
    const width = useWindowDimensions().width;
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    
    const containerStyle = {backgroundColor: 'white',width: width / 1.1, height: height / 1.55, borderRadius: 10,};
    return (
        <View style={styles.container}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} style={{justifyContent: 'center', alignItems: 'center'}} contentContainerStyle={containerStyle}>
                    <AddComponent hideModal={hideModal} id={id}/>
                </Modal>
            </Portal>
            <TouchableOpacity style={styles.addContainer} onPress={() => showModal()}>
                <Ionicons name='add-circle-outline' size={20} color={colors.primary} />
                <Text style={{...styles.add, color: colors.primary}}>הוסף מוזמנ/ת</Text>
            </TouchableOpacity>
            <Filter setFilter={setFilter}/>
            <Requests setRequest={setRequest} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    addContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
    },
    add: {
        fontSize: fontScale(17),
        fontWeight: 'bold',
        paddingStart: 5,
    },
})