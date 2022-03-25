import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import Card from '../../Shared/Card'
import { useTheme  } from 'react-native-paper'
import { useWindowDimensions } from 'react-native';
import { scale, fontScale } from 'react-native-utils-scale'

export default function ScreenOption({screenName, screenText, icon, navigation, event}) {
    const {colors} = useTheme()
    return (
        <TouchableOpacity onPress={() => navigation.navigate(screenName, { event: event})} >
            <View style={{ marginVertical: useWindowDimensions().width / 75,}}>
                    <View style={{...styles.container, width: useWindowDimensions().width / 2.2, height: useWindowDimensions().height / 5.5}}>      
                        {icon}
                        <Text style={{...styles.text, color: colors.secondary}}>{screenText}</Text>
                    </View> 
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: { 
        fontSize: fontScale(20),
        paddingTop: 5,
    }

})
