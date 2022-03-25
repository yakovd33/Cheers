
import React, { useEffect, useState} from 'react'
import { View, ScrollView, Text , StyleSheet} from 'react-native'
import { numGuests } from '../../../../utils/Methods'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { firebase } from '@react-native-firebase/firestore'
import { scale, fontScale } from 'react-native-utils-scale'
import FirebaseUtil from '../../../../utils/FirebaseUtils'

export default function Table({ table, id}) {
    const { colors } = useTheme()
    const [tableGuests, setTableGuests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            let tableContacts = await firebase
            .firestore()
            .collection('contacts')
            .doc(id)
            .collection('contacts')
            .where('table', '==', table.key)
            .get()
            tableContacts = tableContacts.docs.map((doc) => {return {id: doc.id, name: doc.data().name, guests: doc.data().guests, arrived: doc.data().arrived}})
            setTableGuests(tableContacts)
            FirebaseUtil.UpdateTable(id, table.key, {numGuests: numGuests(tableContacts)})
            setLoading(false)
        }
        fetch()
        return () => {}
    }, [])

    return (
        <View style={{paddingTop: 20}}>
            <View style={{flex: 1}}>     
                <Text style={{...styles.tNumber, color: colors.primary}}>
                    שולחן {table.key}
                </Text>
                <Text style={{...styles.type, color: colors.primary}}>
                    {table.type} ({numGuests(tableGuests)}/{table.size})
                </Text>
                {loading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'small'}/></View> 
                :<ScrollView>
                    {tableGuests.map(((item, index) => 
                    <Text key={index} style={item.arrived ? {color: 'green', textAlign: 'center'} : {textAlign: 'center'}}>
                        {item.name} ({item.guests})
                    </Text>
                    ))}
                </ScrollView>}  
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    tNumber: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: fontScale(30),
    },
    type: {
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
    }
})
