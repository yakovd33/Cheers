import React, {useEffect, useState} from 'react';
import {View, ScrollView, useWindowDimensions} from 'react-native';
import PageTitle from '../Components/Shared/PageTitle';
import Card from '../Components/Shared/Card';
import Balance from '../Components/Screens/HomeScreen.js/Balance';
import EventsTable from '../Components/Screens/HomeScreen.js/EventsTable';
import {Searchbar} from 'react-native-paper';
import Icons from '../Components/Screens/HomeScreen.js/Icons';
import Round from '../Components/Screens/HomeScreen.js/Round';
export default function HomeScreen({navigation}) {
  const width = useWindowDimensions().width;
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <ScrollView>
      <PageTitle name={'דף בית'} />
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        <Balance />
      </View>
      <View style={{marginHorizontal: 15}}>
        <Card>
          <Searchbar
            textAlign="right"
            placeholder="חפש לקוחות"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />

          <EventsTable searchQuery={searchQuery} navigation={navigation} />
        </Card>
      </View>
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        <Card>
          <Round />
          <Icons />
        </Card>
      </View>
    </ScrollView>
  );
}
