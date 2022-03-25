import React, {useState} from 'react'
import { Text, View,StyleSheet, Pressable } from 'react-native';
import { Button, useTheme , Menu} from 'react-native-paper';
import Card from '../../../Shared/Card';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EventInput from '../../AddScreen/EventInput';
import FirebaseUtil from '../../../../utils/FirebaseUtils';
import { scale, fontScale } from 'react-native-utils-scale'

export default function AddEditTable({table, title, id}) {
    const { colors } = useTheme()
    const [size, setSize] = useState(table.size)
    const [type, setType] = useState(table.type)
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    
    let arr = []
    for (let index = 4; index < 31; index++) {
        arr.push(<Menu.Item key={index} onPress={() => {closeMenu(), setSize(index)}} title={index} />)   
    }
    const handleClick = () => {
        openMenu()
    }

    const getStyle = (type1) => {
        if (type== type1) {
            return {borderWidth: 3,}
        }
        return {}
    }


    const updateTableLocal = () => {
        if (title == 'הוסף שולחן') {
            FirebaseUtil.AddTable(id, {size: size, type: type, key: table.key, numGuests: 0})
        } else {
            FirebaseUtil.UpdateTable(id, table.key , {size: size, type: type})
        }
    }
    const iconName = () => {
        if (title == 'הוסף שולחן'){
            return 'add-circle-outline'
        }
        return 'edit'
    }
    return (
        <View style={{marginHorizontal: 15}}>
            <Card>
                <View style={{...styles.header, borderBottomColor: colors.secondary}}>
                    <Text style={{fontSize: fontScale(20), color: colors.primary}}>{title} {table.key}</Text>
                    <Button 
                        style={{height: 35,}} 
                        icon={() => <MaterialIcons name={iconName()} size={20} color={'white'}/>} 
                        mode="contained" 
                        onPress={() => {updateTableLocal()}}>
                        <Text style={{fontSize: fontScale(12), color: 'white'}}>{title}</Text>
                    </Button>
                </View>
                <View style={{marginRight: 10,}}>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize: fontScale(16), fontWeight: 'bold', padding: 5, color: colors.secondary}}>מספר מקומות :</Text>
                            <EventInput handleClick ={handleClick} data={size}/>   
                        </View>}
                    >
                        {arr}
                    </Menu>
                    <View style={{flexDirection:'row', alignItems: 'center', marginVertical: 15}}>
                    <Text style={{fontSize: fontScale(16), fontWeight: 'bold', padding: 5, color: colors.secondary}}>סוג שולחן :</Text>
                        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-evenly', flex: 1}}>
                            <Pressable onPress={() => setType('מרובע')} style={{...styles.table, ...getStyle('מרובע'), width: 60, height: 60, backgroundColor: colors.primary }}>
                                <Text style={styles.text}>ריבוע</Text>
                            </Pressable>
                            <Pressable onPress={() => setType('אבירים')} style={{...styles.table,...getStyle('אבירים'), width: 75, height: 50, backgroundColor: colors.primary}}>
                                <Text style={styles.text}>אבירים</Text>
                            </Pressable>
                            <Pressable onPress={() => setType('עגול')} style={{...styles.table, ...getStyle('עגול'), marginRight: 5, width: 60, height: 60, borderRadius: 30, backgroundColor: colors.primary}}>
                                <Text style={styles.text}>עגול</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
        
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 5,
        borderBottomWidth: 1,
        margin: 10,
        justifyContent: 'space-between', 
        flexDirection: 'row'
    },
    table: {
        marginHorizontal: fontScale(10),
        backgroundColor: '#36261B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    }
})