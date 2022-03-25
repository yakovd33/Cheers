import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import { TextInput, useTheme, Menu, Button } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EventInput from '../Screens/AddScreen/EventInput'
import { scale, fontScale } from 'react-native-utils-scale'

export default function ContactData({ name, setName, phone, setPhone, guests, setGuests, table, setTable,tablesIds }) {
    const { colors } = useTheme()
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [visible1, setVisible1] = useState(false)
    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    
    let arr = []
    for (let index = 1; index < 16; index++) {
        arr.push(<Menu.Item key={index} onPress={() => {closeMenu(), setGuests(index)}} title={index} />)   
    }
    let tableArr = [<Menu.Item key={0} onPress={() => {closeMenu1(), setTable(0)}} title={0} />]
    for (let index = 0; index < tablesIds.length; index++) {
        tableArr.push(<Menu.Item key={tablesIds[index]} onPress={() => {closeMenu1(), setTable(tablesIds[index])}} title={tablesIds[index]} />)   
    }

    
    const handleClick = () => {
        openMenu()
    }
    const handleClick1 = () => {
        openMenu1()
    }
    
    return (
        <View>
            <View style={{marginHorizontal: 15, marginVertical: 10}}>
                    <View style={{justifyContent: 'center',}}>
                        <View>
                            <TextInput 
                                label={'שם פרטי'}
                                value={name}
                                onChangeText={text => setName(text)}
                                style={{textAlign: 'right',textAlignVertical: 'center', backgroundColor: 'white', height: 50}}
                            />
                            <View style={{position: 'absolute', right: 15, top: 15}}><FontAwesome size={20} color={colors.primary} name={'user'}/></View>
                        </View>
                        <View>
                            <TextInput 
                                label={'מספר טלפון'}
                                value={phone}
                                keyboardType={'number-pad'}
                                onChangeText={text => setPhone(text)}
                                style={{textAlign: 'right',textAlignVertical: 'center', backgroundColor: 'white', height: 50}}
                            />
                            <View style={{position: 'absolute', right: 15, top: 15}}><MaterialCommunityIcons name="phone" color={colors.primary} size={20} /></View>
                        </View>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                            <View style={{alignItems: 'center', flexDirection: 'row', margin: 10, }}>
                                <Text style={{fontSize: fontScale(16), fontWeight: 'bold', padding: 5, color: colors.secondary}}>כמות אורחים :</Text>
                                <EventInput handleClick={handleClick} data={guests}/>
                            </View>}
                        >
                            {arr}
                        </Menu>
                        <Menu
                            visible={visible1}
                            onDismiss={closeMenu1}
                            anchor={
                            <View style={{alignItems: 'center', flexDirection: 'row', margin: 10, }}>
                                <Text style={{fontSize: fontScale(16), fontWeight: 'bold', padding: 5, color: colors.secondary}}>מספר שולחן :</Text>
                                <EventInput handleClick={handleClick1} data={table}/>
                            </View>}
                        >
                            {tableArr}
                        </Menu>
                    </View>     
                {/* </Card> */}
            </View>
        </View>
          
    )
}

