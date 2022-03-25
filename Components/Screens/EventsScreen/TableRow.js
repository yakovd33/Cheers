import React, {useContext} from 'react'
import { DataTable, useTheme } from 'react-native-paper';
import { dateToString } from '../../../utils/Methods';
import { IdContext } from '../../../utils/IdContext';
import FirebaseUtil from '../../../utils/FirebaseUtils';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert, View, Text, StyleSheet } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
export default function TableRow({event, navigation}) {
    const { setId } = useContext(IdContext)
    const { colors } = useTheme()

    const openAlert = () => {
        Alert.alert('מחיקת אירוע', 'לאחר לחיצת המשך כל פרטי האירוע ימחקו', [
            {text: 'בטל'},{text: 'המשך', onPress: () => FirebaseUtil.DeleteEvent(event.key)},
        ])
    }

    return (
        <DataTable.Row onPress={() => {navigation.navigate('EventScreen'); setId(event.key)}}>
            <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Pressable onPress={() => openAlert()}>
                   <AntDesign size={20} name={'delete'} color={colors.primary}/>
                </Pressable>
            </View>
            <DataTable.Cell style={{flex: 1.5}}>{event.firstN}</DataTable.Cell>  
            <DataTable.Cell style={{flex: 1.5}}>{event.type}</DataTable.Cell>
            <View style={{flex: 1.4, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={{marginVertical: 5}}>
                    {dateToString(event.date.toDate())}
                </Text>
                <View>
                    {new Date() < event.date.toDate() ? 
                    <View style={{...styles.box,backgroundColor: 'green'}}>
                        <MaterialCommunityIcons style={{marginRight: 3}} color={'white'} size={20} name={'calendar-check'}/>
                        <Text style={{color: 'white'}}>פעיל</Text>
                        
                    </View> 
                    : <View style={{...styles.box, backgroundColor: 'red'}}>
                        <MaterialCommunityIcons style={{marginRight: 3}} color={'white'} size={20} name={'calendar-remove'}/>
                        <Text style={{color: 'white'}}>הסתיים</Text>
                    </View>}
                </View>
            </View>
        </DataTable.Row>
    )
}
const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 5, 
        paddingVertical: 5,
        marginBottom: 5,
        borderRadius: 5,
        flexDirection: 'row'
    }
})