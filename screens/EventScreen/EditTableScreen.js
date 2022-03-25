import React, {useContext} from 'react'
import { View,Pressable,Text, Alert } from 'react-native'
import TableGuests from '../../Components/Screens/EventScreen/TablesScreen/TableGuests'
import PageTitle from '../../Components/Shared/PageTitle'
import AddEditTable from '../../Components/Screens/EventScreen/TablesScreen/AddEditTable';
import { IdContext } from '../../utils/IdContext';
import Card from '../../Components/Shared/Card';
import { Button } from 'react-native-paper';
import FirebaseUtil from '../../utils/FirebaseUtils';

export default function EditTableScreen({ route, navigation }) {
    const { id } = useContext(IdContext)
    const { table } = route.params
    
    const openAlert = () => {
        Alert.alert('שולחן ' + table.key, 'לאחר לחיצת המשך כל פרטי השולחן ימחקו',[{text: 'בטל'}, {text: 'מחק',onPress:() => {
            navigation.navigate('TablesScreen'); 
            FirebaseUtil.DeleteTable(id, table.key);
        }}])
    }
    return (
        <View>
            <PageTitle name={'שולחן ' + table.key} />
            <TableGuests table={table}/>
            <AddEditTable table={table} title={'ערוך שולחן'} id={id}/>
            <View style={{marginHorizontal: 15, marginVertical: 10}}>
                <Card>
                    <Button mode='contained' onPress={() => openAlert()}>
                        <Text style={{color: 'white'}}>מחק שולחן</Text>
                    </Button>
                </Card>
            </View>
        </View>
    )
}
