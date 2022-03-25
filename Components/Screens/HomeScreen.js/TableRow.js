import React, {useState, useEffect, useContext} from 'react'
import { DataTable, useTheme } from 'react-native-paper';
import { Linking, View } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { firebase } from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { IdContext } from '../../../utils/IdContext';

export default function TableRow({event, navigation}) {
    const { setId } = useContext(IdContext)
    const { colors } = useTheme()
    const [count, setCount] = useState(0)
    const openInvite = () => {
        Linking.openURL('https://cheersron-cb77b.web.app/?id=' + event.key)
    }

    useEffect(() => {
        const fetch = async () => {
            const count1 = await firebase.firestore().collection('contacts').doc(event.key).collection('contacts').get()
            setCount(count1.size)
        }
        fetch()
        return () => {}
    }, [])

    return (
        <DataTable.Row onPress={() => {setId(event.key);navigation.navigate('Events');}}>
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
                <Pressable onPress={() => openInvite()}>
                    <Ionicons name={'mail-open-outline'} color={colors.primary} size={20}/>
                </Pressable>
            </View>
            <DataTable.Cell style={{flex: 2}}>{event.firstN}</DataTable.Cell>  
            <DataTable.Cell style={{flex: 1.9}}>{event.type}</DataTable.Cell>
            <DataTable.Cell numeric style={{flex: 1}}>{count}</DataTable.Cell>    
        </DataTable.Row>
    )
}
