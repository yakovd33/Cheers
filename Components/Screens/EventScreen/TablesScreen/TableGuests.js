import React, {useState, useEffect, useContext, useCallback} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {ActivityIndicator, Button, useTheme} from 'react-native-paper';
import Card from '../../../Shared/Card';
import DropDownPicker from 'react-native-dropdown-picker';
import {isInGuests, numGuests} from '../../../../utils/Methods';
import {LogBox} from 'react-native';
import {IdContext} from '../../../../utils/IdContext';
import {firebase} from '@react-native-firebase/firestore';
import FirebaseUtil from '../../../../utils/FirebaseUtils';
import {scale, fontScale} from 'react-native-utils-scale';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

LogBox.ignoreAllLogs();

export default function TableGuests({table}) {
  const {id} = useContext(IdContext);
  const {colors} = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [allGuests, setAllGuests] = useState([]);
  const [tableGuests, setTableGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(true);

  const icons = {
    מגיע: <AntDesign size={20} color={'green'} name={'check'} />,
    'לא מגיע': <Feather size={20} color={'red'} name={'x'} />,
    'נשלחה הודעה': (
      <FontAwesome size={20} color={'grey'} name={'paper-plane'} />
    ),
    'לא ענה': <Feather size={20} color={'gold'} name={'phone-off'} />,
    'אולי מגיע': <AntDesign size={20} color={'blue'} name={'question'} />,
    'לא הופץ': (
      <MaterialCommunityIcons size={20} color={'red'} name={'email-off'} />
    ),
    תקלה: <MaterialIcons size={20} color={'red'} name={'error-outline'} />,
    בטל: <AntDesign size={20} name={'delete'} color={colors.primary} />,
  };

  const colorsText = {
    מגיע: 'green',
    'לא מגיע': 'red',
    'נשלחה הודעה': 'grey',
    'לא ענה': 'gold',
    'אולי מגיע': 'blue',
    'לא הופץ': 'red',
    תקלה: 'red',
    בטל: 'delete',
  };

  const addGuests = () => {
    value.forEach(guest =>
      FirebaseUtil.UpdateContact(id, guest, {table: table.key}),
    );
    setOpen(false);
    setValue([]);
  };

  const removeGuest = guest => {
    FirebaseUtil.UpdateContact(id, guest.id, {table: 0, arrived: false});
  };

  const renderItem = useCallback(({item}) => (
    <TouchableOpacity
      onPress={() => removeGuest(item)}
      key={item.phone}
      style={styles.name}>
      <AntDesign size={15} name="delete" color={colors.primary} />
      <Text style={{paddingHorizontal: 4, color: colorsText[item.status]}}>
        {item.name} {item.guests}
      </Text>
      {icons[item.status]}
    </TouchableOpacity>
  ));

  useEffect(() => {
    const fetch = async () => {
      const newGuests = await firebase
        .firestore()
        .collection('contacts')
        .doc(id)
        .collection('contacts')
        .where('table', '==', 0)
        .get();
        console.log(newGuests)
      setAllGuests(() =>
        newGuests.docs.map(doc => {
          return {
            label: doc.data().name,
            value: doc.id,
            icon: () => icons[doc.data().status],
            itemKey: doc.id,
            labelStyle:{
                fontSize: 15,
                color: 'black',
                zIndex: 9999,
                elevation: 200,
              }
          };
        }),
      );
      setLoadingSearch(false);
    };
    fetch();
    return () => {};
  }, [tableGuests]);

  useEffect(() => {
    const tableContacts = firebase
      .firestore()
      .collection('contacts')
      .doc(id)
      .collection('contacts')
      .where('table', '==', table.key)
      .onSnapshot(docs => {
        const newTableGuests = docs.docs.map(doc => {
          return {
            id: doc.id,
            name: doc.data().name,
            guests: doc.data().guests,
            status: doc.data().status,
          };
        });
        setTableGuests(newTableGuests);
        FirebaseUtil.UpdateTable(id, table.key, {
          numGuests: numGuests(newTableGuests),
        });
        setLoading(false);
      });
    return () => {
      tableContacts();
    };
  }, []);
  useEffect(() => {
    console.log(allGuests);
    // console.log(tableGuests);
  }, [allGuests]);
  const innerContainerHeight = open ? 250 : 50
  return (
    <View style={{marginHorizontal: 15, marginVertical: 6}}>
      <View style={styles.card}>
        <DropDownPicker
          searchable={true}
          searchContainerStyle={{
            borderBottomWidth: 0,
          }}
          containerStyle={{height:innerContainerHeight}}
          loading={null}
          style={{
            borderWidth: 0,
            borderRadius: 0,
            flexDirection: 'row-reverse',
            justifyContent: 'flex-end',
          }}
          placeholder="לחץ להוספת אורחים"
          searchPlaceholder="חפש אורחים"
          multiple={true}
          min={0}
          max={15}
          open={open}
          value={value}
          items={allGuests}
          itemKey={'itemKey'}
          setOpen={setOpen}
          setValue={setValue}
          mode="BADGE"
          textStyle={{
            color: colors.primary,
          }}
          dropDownContainerStyle={{
            elevation: 8,
            borderRadius: 0,
            borderWidth: 0,
          }}
          dropDownDirection="BOTTOM"
          
        />
      </View>
      <Card>
        <View style={{...styles.header, borderBottomColor: colors.secondary}}>
          <Text style={{fontSize: fontScale(20), color: colors.primary}}>
            אורחי שולחן זה
          </Text>
          <Text style={{fontSize: fontScale(20), color: colors.primary}}>
            ({numGuests(tableGuests)}/{table.size})
          </Text>
        </View>

        <View style={{height: 170, marginTop: 5, marginHorizontal: 10}}>
          {loading ? (
            <View style={{justifyContent: 'center', flex: 1}}>
              <ActivityIndicator size={'small'} />
            </View>
          ) : (
            <FlatList
              data={tableGuests}
              numColumns={2}
              keyExtractor={item => item.phone}
              contentContainerStyle={{justifyContent: 'flex-end'}}
              renderItem={renderItem}
            />
          )}
        </View>

        <View style={{alignItems: 'flex-start'}}>
          {open && (
            <Button
              style={{height: 35, margin: 7}}
              icon={() => (
                <MaterialIcons
                  name={'add-circle-outline'}
                  size={20}
                  color={'white'}
                />
              )}
              mode="contained"
              onPress={() => addGuests()}>
              <Text style={{fontSize: fontScale(12), color: 'white'}}>
                הוסף
              </Text>
            </Button>
          )}
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 5,
    borderBottomWidth: 1,
    margin: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 200,
    color: 'black',
    opacity: 1,
    zIndex: 8888,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    zIndex: 100,
  },
});
