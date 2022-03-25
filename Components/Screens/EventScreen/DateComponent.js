import React, {useState} from 'react';
import Card from '../../Shared/Card';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {scale, fontScale} from 'react-native-utils-scale';
import Count from '../../Shared/Count';
import clock1 from '../../../images/clock1.gif';

export default function DateComponent({date, type}) {
  const {colors} = useTheme();
  const windowWidth = Dimensions.get('window').width;

  const [today] = useState(new Date());
  let diffInMilliSeconds = (date.toDate() - today) / 1000;
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  let head = 'ימים';
  let text = days;
  if (days == 0) {
    head = 'שעות';
    text = hours;
  }
  let isDouble = `${text}`.split('');

  let thelength = isDouble.length > 1 ? 21 : 23;

  const thewidth = windowWidth / 2.7;

  var nunberwiwth = '';

  if (isDouble.length === 1) {
    nunberwiwth = windowWidth / 2.9;
  }
  if (isDouble.length === 2) {
    nunberwiwth = windowWidth / 3.1;
  }
  if (isDouble.length > 2) {
    nunberwiwth = windowWidth / 3.2;
  }
  console.log(isDouble.length);
  return (
    <View style={{marginHorizontal: 15, marginVertical: 10}}>
      {days > 0 ? (
        <Card>
          <View style={styles.container}>
            {type == 'חתונה' ? (
              <Fontisto
                name="heart-alt"
                size={60}
                style={[{position: 'absolute', alignSelf:'center'}]}
                color={colors.primary}
              />
            ) : (
              <SimpleLineIcons
                name="star"
                size={80}
                style={[{position: 'absolute', alignSelf:'center'}]}
                color={colors.primary}
              />
            )}
            <Image source={clock1} style={{height: 50, width: 50, position: 'absolute', left: 15}} />
            <Text style={{...styles.date, color: colors.secondary, marginLeft: 15}}>{head}</Text>
            <Text style={{...styles.date, position: 'absolute', color: colors.secondary, alignSelf:'center'}}>
              {text}
            </Text>
            <Text style={{...styles.date, color: colors.secondary, marginLeft: 20}}> נותרו</Text>
          </View>
        </Card>
      ) : (
        <Count />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  date: {
    fontSize: fontScale(27),
    fontWeight: 'bold',
    paddingHorizontal: 40,
  },
  container: {
    paddingVertical: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    right: 145,
  },
});
