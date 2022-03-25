import React, {useState} from 'react'
import { TouchableOpacity,View, StyleSheet, Text } from 'react-native';
import { useTheme, Menu } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale, fontScale } from 'react-native-utils-scale'

export default function Filter({ setFilter }) {
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const { colors } = useTheme()

    const icons = {
        'מגיע': <AntDesign size={20} color={'green'} name={'check'} />,
        'לא מגיע': <Feather size={20} color={'red'} name={'x'} />,
        'נשלחה הודעה': <FontAwesome size={20} color={'grey'} name={'paper-plane'}/>,
        'לא ענה': <Feather size={20} color={'gold'} name={'phone-off'} />,
        'אולי מגיע': <AntDesign size={20} color={'blue'} name={'question'} />,
        'לא הופץ': <MaterialCommunityIcons size={20} color={'red'} name={'email-off'} />,
        'תקלה': <MaterialIcons size={20} color={'red'} name={'error-outline'} />,
        'בטל': <AntDesign size={20} name={'delete'} color={colors.primary}/>,
    }

    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <TouchableOpacity onPress={() => openMenu()} style={styles.addContainer}>
                        <Feather name='filter' size={20} color={colors.primary} />
                        <Text style={{...styles.add, color: colors.primary}}>סינון</Text>
                        
                    </TouchableOpacity>}
                    >
                <Menu.Item onPress={() => {closeMenu(), setFilter('מגיע')}} title={<Text>מגיע   {icons['מגיע']}</Text>} />
                <Menu.Item onPress={() => {closeMenu(), setFilter('לא מגיע')}} title={<Text>לא מגיע   {icons['לא מגיע']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), setFilter('נשלחה הודעה')}} title={<Text>נשלחה הודעה   {icons['נשלחה הודעה']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), setFilter('לא ענה')}} title={<Text>לא ענה   {icons['לא ענה']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), setFilter('אולי מגיע')}} title={<Text>אולי מגיע   {icons['אולי מגיע']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), setFilter('לא הופץ')}} title={<Text>לא הופץ   {icons['לא הופץ']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), setFilter('תקלה')}} title={<Text>תקלה   {icons['תקלה']}</Text>}/>
                <Menu.Item onPress={() => {closeMenu(), setFilter('')}} title={<Text>בטל סינון</Text>}/>
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
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