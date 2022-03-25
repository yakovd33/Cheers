import React, {useState, useEffect, useContext } from 'react'
import { View, ScrollView } from 'react-native'
import { Searchbar, ActivityIndicator } from 'react-native-paper'
import RsvpsTable from '../../Components/Screens/EventScreen/RsvpsScreen/RsvpsTable'
import Card from '../../Components/Shared/Card'
import PageTitle from '../../Components/Shared/PageTitle'
import TableActions from '../../Components/Screens/EventScreen/RsvpsScreen/TableActions'
import firestore from '@react-native-firebase/firestore';
import { IdContext } from '../../utils/IdContext'
import { LoginContext } from '../../utils/LoginProvider'
import Coming from '../../Components/Screens/EventScreen/Coming'
import { firebase } from '@react-native-firebase/functions'
import { fixPhone, sendWhatsAppMessage } from '../../utils/Methods';

export default function RsvpsScreen({ route }) {
    const { id } = useContext(IdContext)
    const { event } = route.params
    const [filteredContacts, setFilteredContacts] = useState([])
    const [page, setPage] = useState(0)
    const onChangeSearch = query => setSearchQuery(query);
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')
    const [request, setRequest] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const { user } = useContext(LoginContext)
    useEffect(() => {
        setLoading(true)
        setPage(0)
        const subscriber = firestore()
        .collection('contacts')
        .doc(id)
        .collection('contacts')
        .onSnapshot(docs => {
            let newContacts = []
            docs.forEach(contact => {
                newContacts.push({...contact.data(), id: contact.id})
            })
            if(searchQuery !== '') {
                newContacts = newContacts.filter((item) => { return (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.phone.includes(searchQuery))})
            }
            if (request !== '') {
                if (request === 'ride') {
                    newContacts = newContacts.filter((item) => { return (item.ride == true)})
                } else {
                    newContacts = newContacts.filter((item) => { return (item.dish === request)})
                }
            } 
            if (filter === '') {
                setFilteredContacts(newContacts)
            } else {
                setFilteredContacts(newContacts.filter((item) => { return filter == item.status}))
            }
            
            setLoading(false)
        })
        return () => { subscriber() }
    }, [filter, request, searchQuery])

    console.log(filteredContacts)
    const sendM = (contact) => {
        let message = ''
        if (event.type == 'חתונה') {
            message = 'שלום ' + contact.name + ' הנך מוזמנ/ת לחתונה של ' + event.celebrator.name + ' ו'  + event.partner.name + '. לאישור הגעה: https://cheersron-cb77b.web.app/?id=' + id + '%26contactId=' + contact.id
        } else {
            message = 'שלום ' + contact.name + ' הנך מוזמנ/ת לבר/ת מצווה של ' + event.celebrator.name + '. לאישור הגעה: https://cheersron-cb77b.web.app/?id=' + id + '%26contactId=' + contact.id
        }
        if (user) {
            firebase.functions().httpsCallable('send')({message: message, phone: contact.phone, id: id, contactId: contact.id})  
        } else {
            sendWhatsAppMessage('whatsapp://send?text=' + message  + '&phone=+972 ' + fixPhone(contact.phone))
        }
    }
    
    return (
        <ScrollView>
            <PageTitle name={'מוזמנים'}/>
             <Coming />
             <View style={{marginHorizontal: 15, marginVertical: 10}}>
             <Card>
                 <TableActions setFilter={setFilter} setRequest={setRequest}/>
                 <View style={{marginHorizontal: 10, marginVertical: 10}}>
                     <Searchbar
                        textAlign='right'
                        placeholder="חפש איש קשר"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                {loading ?  <ActivityIndicator style={{justifyContent:'center', alignItems: 'center', flex: 1}} size={'large'}/>
                :<RsvpsTable 
                    contacts={filteredContacts} 
                    sendM={sendM}
                    page={page}
                    setPage={setPage}
                />}
                </Card>
            </View>
        </ScrollView>
    )
}

