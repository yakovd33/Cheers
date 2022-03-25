import React, {useState, useEffect, useContext} from 'react'
import { IdContext } from '../../../../utils/IdContext'
import { View, Text, useWindowDimensions,TouchableOpacity } from 'react-native'
import { firebase } from '@react-native-firebase/firestore'
import { useTheme, ActivityIndicator, Portal,Modal} from 'react-native-paper'
import Table from './Table'
import Card from '../../../Shared/Card'
import { scale, fontScale } from 'react-native-utils-scale'
import Tables from '../TablesScreen/Tables'

export default function LiveTables({ setTablesIds }) {
    const { colors } = useTheme();
    const [loading, setLoading] = useState(true)
    const [tables, setTables] = useState([])
    const [table, setTable] = useState(null)
    const { id } = useContext(IdContext)
    const height = useWindowDimensions().height;
    const width = useWindowDimensions().width;
    const [visible, setVisible] = useState(false);
    const showModal = (table) => {setTable(table); setVisible(true);}
    const hideModal = () => {setVisible(false); setTable(null)}
    const containerStyle = {backgroundColor: 'white',width: width  - 50, height: width - 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center'};

    const action = (table) => {
        showModal(table)
    }

    useEffect(() => {
        setLoading(true)
        const subscriber = firebase.
        firestore()
        .collection('tables')
        .doc(id)
        .collection('tables')
        .onSnapshot((snapshot => {
            const newTables = snapshot.docs.map(doc => {return {...doc.data(), id: doc.id}})
            const len = newTables.length;
            var isSwapped = false;  
            for(let i =0; i < len; i++){
                isSwapped = false;
                for(let j = 0; j < len - 1; j++){
                    if(newTables[j].key > newTables[j + 1].key){
                        var temp = newTables[j]
                        newTables[j] = newTables[j+1];
                        newTables[j + 1] = temp;
                        isSwapped = true;
                    }
                }
                if(!isSwapped){
                break;
                }
            }
            setTables(newTables)
            setTablesIds(newTables.map(doc => doc.id))
            setLoading(false)
        }))   
        
        return () => {subscriber()}
    }, [])

    return (

        <View style={{marginVertical: 10}}>
            <Card>
                <Text style={{fontSize: fontScale(25), padding: 10, color: colors.primary, fontWeight: 'bold', writingDirection: 'rtl'}}>שולחנות בזמן אמת</Text>
                {loading ? <ActivityIndicator size={'large'} /> 
                : <Tables tables={tables} action={action}/>}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} style={{justifyContent: 'center', alignItems: 'center'}} contentContainerStyle={containerStyle}>
                        {table != null && <Table table={table} id={id}/>}
                    </Modal>
                </Portal>
            </Card>
        </View>

    )
}
