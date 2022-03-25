import React, { useContext } from 'react';
import { View, StyleSheet,Image,  } from 'react-native';
import profile from '../../images/profile.jpeg'
import { Drawer, useTheme, } from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialIcons';

import FirebaseUtil from '../../utils/FirebaseUtils';

import { scale, fontScale } from 'react-native-utils-scale'
import { IdContext } from '../../utils/IdContext';

export function DrawerContent(props) {
    const { setId } = useContext(IdContext)
    const signOut = (navigation) => {
        
        setId('')
        FirebaseUtil.signOut()
    
        navigation.closeDrawer()
    }
    const { colors } = useTheme()
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <Image source={profile} style={{width: '100%',height: '90%'}}></Image>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home" 
                                color={colors.primary}
                                size={size}
                                />
                            )}
                            label="דף בית"
                            labelStyle={{writingDirection: 'rtl'}}
                            onPress={() => {setId(''); props.navigation.navigate('Home');}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="add-circle-outline" 
                                color={colors.primary}
                                size={size}
                                />
                            )}
                            label="לקוח חדש"
                            labelStyle={{writingDirection: 'rtl'}}
                            onPress={() => {setId(''); props.navigation.navigate('Add'); }}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="event" 
                                color={colors.primary}
                                size={size}
                                />
                            )}
                            label="אירועים"
                            labelStyle={{writingDirection: 'rtl'}}
                            onPress={() => {setId(''); props.navigation.navigate('Events', {screen: 'EventsScreen'});}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="logout" 
                        color={colors.primary}
                        size={size}
                        />
                    )}
                    label="התנתק"
                    labelStyle={{writingDirection: 'rtl'}}
                    onPress={() => {signOut(props.navigation)}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      alignItems: 'center',
      maxHeight: 210,
    },
    title: {
      fontSize: fontScale(16),
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: fontScale(14),
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginLeft: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });