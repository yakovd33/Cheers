import React, {useState} from 'react'
import { Menu, useTheme } from 'react-native-paper';
import { Text,View,StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EventInput from './EventInput';
import { scale, fontScale } from 'react-native-utils-scale'
export default function ChooseType({type, setType}) {
    const { colors } = useTheme()

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);

    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={styles.dateContainer}>
                <Text style={styles.inputTitle}>סוג</Text>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Text>HI</Text>}
                    anchor={<EventInput data={type} handleClick={openMenu}/>}
                >
                    <Menu.Item onPress={() => {closeMenu(), setType('חתונה')}} title="חתונה" />
                    <Menu.Item onPress={() => {closeMenu(), setType('בר/ת מצווה')}} title="בר/ת מצווה"/>
                </Menu>
            </View>
            <MaterialIcons name="celebration" size={20} color={colors.primary} style={{padding: 15}}/>
        </View>
    )
}
const styles = StyleSheet.create({
    inputTitle: {
        padding: 15,
        fontSize: fontScale(16),
        color: '#5F6A6A',     
    },
    dateContainer: {
        paddingTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    }
})