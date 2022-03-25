import React from 'react'
import {TextInput } from 'react-native-paper';
import { View } from 'react-native'

export default function DataInput({userData}) {
    return (
        userData.map(input =>
            <View key={input['N']}>
                <TextInput 
                    label={input['N']}
                    value={input['V']}
                    keyboardType={input['K']}
                    onChangeText={text => input['F'](text)}
                    style={{textAlignVertical: 'center', backgroundColor: 'white', height: 50,}}
                    key={input.key}
                />
                <View style={{position: 'absolute', right: 15, top: 15}}>{input['I']}</View>
            </View>

        )
    )
}
