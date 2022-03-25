import { firebase } from '@react-native-firebase/firestore'
import React, {useState ,useEffect } from 'react'
// import { View } from 'react-native'
import { DataTable , ActivityIndicator} from 'react-native-paper';
import TableRow from './TableRow';

export default function EventsTable({searchQuery, navigation}) {
    const [loading, setLoading] = useState(true); 
    const [events, setEvents] = useState([]); 
    const [page, setPage] = useState(0);

    useEffect(() => {
        const subscriber = firebase.firestore()
          .collection('events')
          .onSnapshot(querySnapshot => {
            const events = [];
            querySnapshot.forEach(documentSnapshot => {
                if(searchQuery == ""){
                    events.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                } else if (documentSnapshot.data().firstN.toLowerCase().includes(searchQuery.toLowerCase())){
                    events.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                }
            });
            setEvents(events);
            setLoading(false);
          });
        return () => {subscriber();}
      }, [searchQuery]);

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={{flex: 1}}>הזמנה</DataTable.Title>
                <DataTable.Title style={{flex: 2}}>שם הלקוח</DataTable.Title>
                <DataTable.Title style={{flex: 1.5}}>סוג</DataTable.Title>
                <DataTable.Title numeric style={{flex: 1.4}}>מספר רשומות</DataTable.Title>
            </DataTable.Header>

            {events.map((item) => <TableRow key={item.key} event={item} navigation={navigation}/>)}

            <DataTable.Pagination
                page={page}
                numberOfPages={3}
                onPageChange={(page) => setPage(page)}
                showFastPagination
                optionsLabel={'Rows per page'}
            />
        </DataTable>
        
    )
}
