import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import logo from '../../images/logo.png'
import { scale, fontScale } from 'react-native-utils-scale'

export default function Header() {

  
  return (
        <View style={styles.headerContainer}>
          <Image source={logo} style={styles.logo}></Image>
          <Text style={styles.headerText}>מנהל אירועים</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: fontScale(30),
    color: '#FF5487',
  },
  logo: {
    width: 70,
    height: 50,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});