import React, {useState, useEffect} from 'react'
import { ScrollView,Text,View, useWindowDimensions } from 'react-native'
import { ActivityIndicator, Button, useTheme, Portal, Modal } from 'react-native-paper'
import Status from '../../Components/Screens/EventScreen/TablesScreen/Status'
import Tables from '../../Components/Screens/EventScreen/TablesScreen/Tables'
import PageTitle from '../../Components/Shared/PageTitle'
import firestore from '@react-native-firebase/firestore'
import Card from '../../Components/Shared/Card'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AddEditTable from '../../Components/Screens/EventScreen/TablesScreen/AddEditTable'
import { useContext } from 'react'
import { IdContext } from '../../utils/IdContext'
import { scale, fontScale } from 'react-native-utils-scale'
import FirebaseUtil from '../../utils/FirebaseUtils'
export default function TablesScreen({ navigation }) {
    const { colors } = useTheme()
    const { id } = useContext(IdContext)
    const [tables, setTables] = useState([])
    const [loading, setLoading] = useState(true)

    const height = useWindowDimensions().height;
    const width = useWindowDimensions().width;
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white',width: width / 1.05, height: height / 2.7, borderRadius: 10,};

    const action = (table) => {
        navigation.navigate('EditTableScreen', {table: table})
    }
    
    useEffect(() => {
        setLoading(true)
        FirebaseUtil.SetTableSizes(id)
        const subscriber = 
        firestore()
        .collection('tables')
        .doc(id)
        .collection('tables')
        .onSnapshot((docs) => {
            const newTables = []
            docs.forEach((doc) => {
                newTables.push({...doc.data()})
            })
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
            setLoading(false)
        });   
        return () => {subscriber()}
    }, [])
    
    
    return (
        <ScrollView>
            <PageTitle name={'סידורי ישיבה'} />
            <Status tables={tables} />
            <Button 
                style={{margin: 15}} 
                contentStyle={{flexDirection: 'row-reverse'}} 
                mode={'contained'} 
                icon={() => <MaterialIcons size={20} color={'white'} name={'add-circle-outline'}/>}
                onPress={() => showModal()}
            >
                <Text style={{color: 'white'}}>הוסף שולחן</Text>
            </Button>

            <View style={{marginHorizontal: 15, marginBottom: 10,}}>
                <Card>
                    {loading ? <ActivityIndicator size={'small'} />
                    : tables.length > 0  ?
                    <Tables action={action} tables={tables} />
                    :<View style={{paddingVertical: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <MaterialIcons size={20} color={colors.primary} name={'error'}/>
                        <Text style={{fontSize: fontScale(17), paddingStart: 7}}>אין שולחנות להצגה</Text>
                        
                    </View>}
                    
                </Card>
            </View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} style={{justifyContent: 'center', alignItems: 'center'}} contentContainerStyle={containerStyle}>
                    {tables.length > 0 ? <AddEditTable table={{type: 'מרובע', size: 15, guests: [], key: tables[tables.length - 1].key + 1}} title={'הוסף שולחן'} id={id} /> 
                    : <AddEditTable table={{type: 'מרובע', size: 15, guests: [], key:  1}} title={'הוסף שולחן'} id={id} />}
                </Modal>
            </Portal>
        </ScrollView>
    )
}
