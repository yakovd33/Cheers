import React from 'react'
import { ToggleButton } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
export default function Gender({value,setValue}) {
    return (
        <ToggleButton.Row onValueChange={value => {if (value) {setValue(value)}}} value={value}>
            <ToggleButton 
                style={value=='חתן' ? {backgroundColor: 'pink', width: 40, height: 20} : {backgroundColor: 'white', width: 40, height: 20}} 
                icon={() => <FontAwesome name={'male'} size={20} color={'black'}/>} value="חתן" />
            <ToggleButton 
                style={value=='כלה' ? {backgroundColor: 'pink', width: 40, height: 20} : {backgroundColor: 'white', width: 40, height: 20}} 
                icon={() => <FontAwesome name={'female'} size={20} color={'black'}/>} value="כלה" />
        </ToggleButton.Row>

    )
}
