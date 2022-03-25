import React, {useContext, useState, useEffect} from 'react'
import { View,Text,TouchableOpacity,  } from 'react-native'
import { Button, Searchbar,ActivityIndicator, Modal,Portal } from 'react-native-paper'
import Card from '../../../Shared/Card'
import { firebase } from '@react-native-firebase/firestore'
import { IdContext } from '../../../../utils/IdContext'
import Guest from './Guest'
import { fixPhone } from '../../../../utils/Methods'

export default function GuestSearch({ tablesIds}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [contacts,setContacts] = useState([])
    const [loading,setLoading] = useState(false)
    const { id } = useContext(IdContext)
    const onChangeSearch = query => setSearchQuery(query);

    const search = async () => {
        setLoading(true)
        if (searchQuery != '') {
            let newContacts = await firebase
            .firestore()
            .collection('contacts')
            .doc(id)
            .collection('contacts')
            .get()
            newContacts = newContacts.docs.map(contact => {return {...contact.data(), id: contact.id}})
            newContacts = newContacts.filter((item) => {return (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || fixPhone(item.phone).includes(searchQuery))}) 
            setContacts(newContacts)
        } else {
            setContacts([])
        }
        setLoading(false)
    }
    return (
        <View style={{marginTop: 10}}>
            <Card>
                    <Searchbar
                        textAlign='right'
                        placeholder="חפש לקוחות"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                    <View style={{padding: 10}}>
                    <Button mode='contained'  onPress={() => search()}>
                        <Text style={{color: 'white'}}>חפש</Text>
                    </Button>
                    </View>

                {loading ? 
                <ActivityIndicator size={'large'}/> : 
                contacts.map(contact => 
                    <Guest contact={contact} key={contact.id} tablesIds={tablesIds} search={search}/>
                )}
            </Card>
        </View>

    )
}
