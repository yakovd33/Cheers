import React, { useState } from 'react'
import { TouchableOpacity, Text, StyleSheet} from 'react-native'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default function Contact({ item, addContact }) {
    const [checked, setChecked] = useState(false)
    const { colors } = useTheme()

    const handleClick = () =>{
        addContact(item, checked)
        setChecked(!checked)
    }

    return (
        <TouchableOpacity onPress={() => handleClick()} style={styles.container}>
            {checked?
                <Icon color={colors.primary} name={'checkbox-marked-outline'} size={30}/>   
            : 
                <Icon color={colors.primary} name={'checkbox-blank-outline'} size={30}/>
            } 
            <Text style={{...styles.text, color: colors.primary}}>{item.name}</Text>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        padding: 10,
        textAlign: 'right'
    }
})