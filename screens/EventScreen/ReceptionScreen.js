import React, { useState } from 'react'
import { View , ScrollView} from 'react-native'
import PageTitle from '../../Components/Shared/PageTitle'
import LiveTables from '../../Components/Screens/EventScreen/ReceptionScreen/LiveTables';
import GuestSearch from '../../Components/Screens/EventScreen/ReceptionScreen/GuestSearch';
import Count from '../../Components/Shared/Count'
export default function ReceptionScreen() {
    const [tablesIds, setTablesIds] = useState([])
    return (
        <ScrollView>
            <PageTitle name='קבלת פנים' />
            <View style={{marginHorizontal: 15, marginVertical: 10}}>
                <Count />
                <GuestSearch tablesIds={tablesIds}/>
                <LiveTables setTablesIds={setTablesIds} />
            </View>    
        </ScrollView>
    )
}
