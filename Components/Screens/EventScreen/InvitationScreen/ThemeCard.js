import React, {useContext, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../../../Shared/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../../../../images/logo.png';
import {IdContext} from '../../../../utils/IdContext';
import FirebaseUtil from '../../../../utils/FirebaseUtils';
import {scale, fontScale} from 'react-native-utils-scale';

export default function ThemeCard({picked, settings, setTrigger, trigger}) {
  const {id} = useContext(IdContext);

  const handleClick = () => {
    FirebaseUtil.UpdateInvitation(id, {
      backgroundURL: settings.background,
      background: settings.key,
      primary: settings.primary,
      secondary: settings.secondary,
      size: settings.size,
    });
  };

  return (
    <Pressable
      onPress={() => handleClick()}
      style={
        picked
          ? {borderWidth: 2, margin: 10, borderColor: 'black'}
          : {margin: 10}
      }>
      <Card>
        <ImageBackground
          source={null}
          style={styles.container}
          resizeMode="cover">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 30,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{...styles.text, color: settings.secondary}}>
                הזמנה
              </Text>
              <Text style={{...styles.text, color: settings.secondary}}>
                לחתונה
              </Text>
            </View>
            <MaterialCommunityIcons
              name={'ring'}
              size={40}
              color={settings.primary}
            />
          </View>
          <Image style={{width: 80, height: 55, marginTop: 10}} source={logo} />
        </ImageBackground>
      </Card>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 150,
    borderWidth: 0,
    borderColor: 'black',
    alignItems: 'center',
  },
  text: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
  },
});
