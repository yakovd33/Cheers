import React from 'react'
import { View,Pressable, Image, Linking } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import instagram from '../../../images/Icons/instagram.png'
import logo from '../../../images/logo.png'
export default function Icons() {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Pressable style={{margin: 10}} onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=100066710536269')}>
                <AntDesign name='facebook-square' size={60} color='blue'/>
            </Pressable >
            <Pressable style={{margin: 10}} onPress={() => Linking.openURL('https://dbm-apps.github.io/cheers.github.io/')}>
                <Image source={logo} style={{width: 85, height: 60}}></Image>
            </Pressable>
            <Pressable style={{margin: 10}} onPress={() => Linking.openURL('https://instagram.com/cheers22400?r=nametag')}>
                <Image source={instagram} style={{width: 60, height: 60}}></Image>
            </Pressable>
        </View>
    )
}
