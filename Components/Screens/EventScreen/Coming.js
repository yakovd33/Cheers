import React, { useContext, useEffect, useState } from 'react'
import Card from '../../Shared/Card'
import { StyleSheet, View, Text} from 'react-native';
import { useTheme } from 'react-native-paper';
import { IdContext } from '../../../utils/IdContext';
import firestore from '@react-native-firebase/firestore'
import { scale, fontScale } from 'react-native-utils-scale'

export default function Coming() {
    const { colors } = useTheme()
    const { id } = useContext(IdContext)
    const [status,setStatus] = useState({
        'מגיע': 0,
        'לא מגיע': 0,
        'אולי מגיע': 0,
        'לא ענה': 0,
        'מוזמנים': 0,
        'לא הופץ': 0
    })

    useEffect(() => {
        const subscriber = firestore()
        .collection('contacts')
        .doc(id)
        .collection('contacts')
        .onSnapshot(docs => {
            const count = {
                'מגיע': 0,
                'לא מגיע': 0,
                'אולי מגיע': 0,
                'לא ענה': 0,
                'מוזמנים': 0,
                'לא הופץ': 0
            } 
            docs.forEach(contact => {
                count[contact.data().status] += parseInt(contact.data().guests) ;
                count['מוזמנים'] += parseInt(contact.data().guests);
            })
            setStatus(count)   
        })
        return () => {subscriber()}
    }, [])
    return (
        <View style={{marginHorizontal: 15}}>
            <Card>
                <View style={{...styles.container}}>
                    <View style={styles.numbersContainer}>
                        <Text style={{...styles.number, color: 'green'}}>{status['מגיע']}</Text>
                        <Text style={{...styles.number, color: colors.primary}}>{status['לא מגיע']}</Text>
                        <Text style={{...styles.number, color: '#000080'}}>{status['מוזמנים']}</Text>
                    </View>
                    <View style={styles.comingContainer}>
                        <Text style={styles.coming}>מגיעים</Text>
                        <Text style={styles.coming}>לא מגיעים</Text>     
                        <Text style={styles.coming}>מוזמנים</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{...styles.number, color: 'gold', marginHorizontal: 10}}>{status['לא ענה']}</Text>
                    <Text style={styles.coming}>לא ענו</Text>
                    <Text style={{...styles.number, color: 'blue', marginHorizontal: 10}}>{status['אולי מגיע']}</Text>
                    <Text style={styles.coming}>אולי מגיעים</Text>        
                </View>

            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    numbersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    number: {
        fontSize: fontScale(50),
        fontWeight: 'bold',
        letterSpacing: -2,
    },
    comingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    coming: {
        fontSize: fontScale(20),
    },
    smallNumbers: {
        fontSize: fontScale(35),
    }
    
})
