
import React from 'react'
import { Text , StyleSheet, useWindowDimensions, TouchableOpacity, ImageBackground, View} from 'react-native'
import { scale, fontScale } from 'react-native-utils-scale'
import roundTableIcon from '../../../../images/Icons/roundTableIcon.png'
export default function Table({ table, action }) {
    const width = useWindowDimensions().width
    
    return (
        <TouchableOpacity style={{...styles.table, width: width / 3 - 30, height: width / 3 - 30}} onPress={() => action(table)}>
            <ImageBackground source={roundTableIcon} style={{width: 40, height: 40}}>
                <Text style={styles.tNumber}>
                {table.key}
                </Text>
            </ImageBackground>
            <Text style={styles.type}>
                {table.type} ({table.numGuests}/{table.size})
            </Text>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    tNumber: {
        color: 'black',
        textAlign: 'center',
        fontSize: fontScale(20),
        paddingTop: 3.5
        
    },
    type: {
        color: 'black',
        textAlign: 'center',
        fontSize: fontScale(15),
        
    },
    button: {
        justifyContent: 'center',
        borderRadius: 10, 
        borderWidth: 1, 
        padding: 5,
        marginHorizontal: 2,
        flexDirection: 'row' 
    },
    table:{
        backgroundColor: '#C0C0C0',
        borderWidth: 1, 
        borderColor: '#696969', 
        borderStyle: 'solid', 
        margin: 5,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})
