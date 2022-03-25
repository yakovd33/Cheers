import React, { useState, useEffect, useRef} from 'react'
import { View,Text, FlatList, TouchableOpacity, Platform} from 'react-native';
import Contacts from 'react-native-contacts';
import PageTitle from '../../../Shared/PageTitle';
import { Button, Searchbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Contact from './Contact'
import Feather from 'react-native-vector-icons/Feather'
import { fixPhone } from '../../../../utils/Methods';
import FirebaseUtil from '../../../../utils/FirebaseUtils';
import { scale, fontScale } from 'react-native-utils-scale'

export default function AddContacts({ hideModal, id }) {
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const conAdded = useRef([])
    const { colors } = useTheme()
    const onChangeSearch = query => setSearchQuery(query);

    const addContact = (item, checked) => {
        let newConAdded = [...conAdded.current]
        if (checked) {
            newConAdded = newConAdded.filter(contact => item.name != contact.name)
        } else {
            newConAdded.push({name: item.name, phone: fixPhone(item.phone), status: 'לא הופץ', guests: 1})
        }
        conAdded.current = newConAdded
    }

  
    useEffect(() => {
        Contacts.getAll().then(contacts => {
            const newContacts = []
            contacts.forEach(item => {
                if (item.phoneNumbers[0] != undefined) {
                    if(searchQuery == ""){
                        newContacts.push({id: item.recordID, name: item.givenName + " " + item.familyName, phone: fixPhone(item.phoneNumbers[0].number), chosen: false})
                    } else if (item.displayName.toLowerCase().includes(searchQuery.toLowerCase())){
                        newContacts.push({id: item.recordID, name: item.givenName + " " + item.familyName, phone: fixPhone(item.phoneNumbers[0].number), chosen: false})
                    }
                }
            })
            setContacts(newContacts)
            setLoading(false)
        })

        return () => {      
        }
    }, [searchQuery])

    return (
        !loading &&
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <PageTitle name={'הוספ/י מאנשי קשר'}/>
                <TouchableOpacity style={{paddingEnd: 10}} onPress={() => hideModal()}>
                    <Feather name={'x-square'} size={35} color={colors.primary} />
                </TouchableOpacity>
                
            </View>
            
            <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Searchbar
                    textAlign='right'
                    placeholder="חפש איש קשר"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            
            <FlatList
                style={{flex: 1}}
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={( { item } ) => <Contact addContact={addContact} item={item} />}
            />

            <Button 
                icon={() => (<Icon size={30} name={'group-add'} color={'white'}/>)} 
                mode="contained"
                 onPress={() => {hideModal(); conAdded.current.forEach(item => FirebaseUtil.AddContact(id,item))}}>
                <Text style={{color: 'white', fontSize: fontScale(20),}}>הוסף</Text>
            </Button>
        </View>
        

    )
}
