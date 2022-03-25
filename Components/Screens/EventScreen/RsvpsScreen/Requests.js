import React, {useState} from 'react'
import { TouchableOpacity,View, StyleSheet, Text } from 'react-native';
import { useTheme, Menu } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import { scale, fontScale } from 'react-native-utils-scale'

export default function Requests({ setRequest }) {
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const { colors } = useTheme()

    const icons = {
        'ride': <AntDesign size={20} color={colors.primary} name={'car'} />,
        '': <AntDesign size={20} color={colors.primary} name={'car'} />,
    }

    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <TouchableOpacity style={styles.addContainer} onPress={() => openMenu()}>
                        <Octicons name='tasklist' size={20} color={colors.primary} />
                        <Text style={{...styles.add, color: colors.primary}}>בקשות</Text>
                    </TouchableOpacity>}
                    >
                <Menu.Item onPress={() => {closeMenu(), setRequest('ride')}} title={<Text>צריך הסעה</Text>} />
                <Menu.Item onPress={() => {closeMenu(), setRequest('ללא גלוטן')}} title={<Text>ללא גלוטן</Text>} />
                <Menu.Item onPress={() => {closeMenu(), setRequest('גלאט')}} title={<Text>גלאט</Text>} />
                <Menu.Item onPress={() => {closeMenu(), setRequest('צמחוני')}} title={<Text>צמחוני</Text>} />
                <Menu.Item onPress={() => {closeMenu(), setRequest('טבעוני')}} title={<Text>טבעוני</Text>} />
                <Menu.Item onPress={() => {closeMenu(), setRequest('')}} title={<Text>בטל</Text>} />
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