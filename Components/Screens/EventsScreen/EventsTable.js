import React, { useState, useEffect } from 'react'
import { DataTable , ActivityIndicator} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import TableRow from './TableRow';

export default function EventsTable({searchQuery, navigation}) {
    const [loading, setLoading] = useState(true); 
    const [events, setEvents] = useState([]); 
    const [page, setPage] = useState(0);

    useEffect(() => {
        const subscriber = firestore()
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
                <DataTable.Title style={{flex: 0.6}}>מחק</DataTable.Title>
                <DataTable.Title style={{flex: 1.5}}>שם הלקוח</DataTable.Title>
                <DataTable.Title style={{flex: 1.5}}>סוג</DataTable.Title>
                <DataTable.Title numeric style={{flex: 1.4}}>תאריך האירוע</DataTable.Title>
            
            </DataTable.Header>

            {events.length > 0 && events.map((item) => <TableRow key={item.key} event={item} navigation={navigation} />)}

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
