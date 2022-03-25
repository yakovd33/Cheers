import React, {useState, useEffect, useContext} from 'react'
import { ScrollView,View } from 'react-native'
import PageTitle from '../Components/Shared/PageTitle'
import EventsTable from '../Components/Screens/EventsScreen/EventsTable'
import Card from '../Components/Shared/Card'
import { Searchbar } from 'react-native-paper';
import { IdContext } from '../utils/IdContext'

export default function EventsScreen({navigation}) {
    const [searchQuery, setSearchQuery] = useState('');
    const { id } = useContext(IdContext)
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        if (id != '') {
            navigation.navigate('EventScreen')
        }
        return () => {}
    }, [])
    return (
        <ScrollView>
            <PageTitle name="אירועים" />
            <View style={{marginHorizontal: 15, marginVertical: 10}}>
                <Card>
                    <Searchbar
                        textAlign='right'
                        placeholder="חפש לקוחות"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                    <EventsTable navigation={navigation} searchQuery={searchQuery}/>
                </Card>
            </View>
        </ScrollView>
            
    )
}

