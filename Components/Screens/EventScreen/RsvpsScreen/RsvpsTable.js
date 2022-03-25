import React from 'react'
import { DataTable } from 'react-native-paper'
import TableRow  from './TableRow'

export default function RsvpsTable ( { contacts, sendM, page, setPage } )  {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{flex: 1}}>מחק</DataTable.Title>
        <DataTable.Title style={{flex: 2.5}}>שם מלא</DataTable.Title>
        <DataTable.Title style={{flex: 3}}>הודעה / התקשר</DataTable.Title>
        <DataTable.Title style={{flex: 1}} numeric>מגיע/ה</DataTable.Title>
      </DataTable.Header>

      {contacts.slice(page*10, page*10 + 10 ).map((item) => <TableRow key={item.phone} sendM={sendM} contact={item} />)}
      
      
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(contacts.length / 10)}
        onPageChange={page => setPage(page)}
        label={`דף ${page + 1} מתוך ${Math.ceil(contacts.length / 10)}`}
        showFastPaginationControls
      />
    </DataTable>
     
      
    
  );
};