import { useTheme } from 'react-native-paper'
import React, { useContext } from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { Switch } from 'react-native-paper'
import { IdContext } from '../../../../utils/IdContext'
import FirebaseUtil from '../../../../utils/FirebaseUtils'

export default function SwitchContainer({ value, setValue, head, text }) {
    const { colors } = useTheme()
    const { id } = useContext(IdContext)
    const width = useWindowDimensions().width
    const handleClick = (changedValue) => {
        if (head.includes('אפקט')) {
            FirebaseUtil.UpdateInvitation(id, { confetti: changedValue })
        } else if (head.includes('צריך')) {
            FirebaseUtil.UpdateInvitation(id, { ride: changedValue })
        } else if (head.includes('חופה')) {
            FirebaseUtil.UpdateInvitation(id, { hoopa: changedValue })
        } else if (head.includes('העדפת')) {
            FirebaseUtil.UpdateInvitation(id, { dish: changedValue })
        } else if (head.includes('תמונות')) {
            FirebaseUtil.UpdateInvitation(id, { topIcons: changedValue })
        } else if (head.includes('שמות')) {
            FirebaseUtil.UpdateInvitation(id, { brothers: changedValue })
        } else if (head.includes('מודפסות')){
            FirebaseUtil.UpdateInvitation(id, { printed: changedValue })
        } else {
            FirebaseUtil.UpdateInvitation(id, { declaration: changedValue })
        }
        setValue(changedValue)
    }
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ padding: 10, width: width - 80, justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', writingDirection: 'rtl' }}>{head}</Text>
                <Text style={{ writingDirection: 'rtl' }}>{text}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={(changedValue) => handleClick(changedValue)}
                color={colors.primary}
            />
        </View>
    )
}
