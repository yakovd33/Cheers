
import React,{ useContext, useState } from 'react'
import { LoginContext } from './LoginProvider'
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native'
import LoadingScreen from '../screens/LoadingScreen'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import EventsScreen from '../screens/EventsScreen'
import EventScreen from '../screens/EventScreen/EventScreen'
import UpdateEventScreen from '../screens/EventScreen/UpdateEventScreen';
import CheckListScreen from '../screens/EventScreen/CheckListScreen'
import RsvpsScreen from '../screens/EventScreen/RsvpsScreen';
import TablesScreen from '../screens/EventScreen/TablesScreen';
import AddScreen from '../screens/AddScreen'
import Header from '../Components/Shared/Header'
import InvitationScreen from '../screens/EventScreen/InvitationScreen';
import { DrawerContent } from '../Components/Shared/DrawerContent';
import EditTableScreen from '../screens/EventScreen/EditTableScreen';
import { IdContext } from './IdContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useTheme } from 'react-native-paper';
import ReceptionScreen from '../screens/EventScreen/ReceptionScreen';
const Stack = createStackNavigator()
import { View, Text } from 'react-native'

const HomeStackScreen = ({navigation}) => {
    const { colors } = useTheme()
    return (
        <Stack.Navigator
            screenOptions={(props) => ({
                headerTitleAlign: 'center',
                headerTitle: () => <Header />,
                headerLeft: () => 
                    <Feather 
                        name={'menu'} 
                        color={colors.primary} 
                        style={{paddingStart: 10}} 
                        size={25} 
                        onPress={() => navigation.openDrawer()}
                    />,
            })}
            
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        </Stack.Navigator>
    )
}

const EventsStackScreen = ({navigation}) => {
    const { user } = useContext(LoginContext)
    const { setId } = useContext(IdContext)
    const { colors } = useTheme() 
    return (     
        <Stack.Navigator
            screenOptions={(props) => ({
                headerTitleAlign: 'center',
                headerTitle: () => <Header />,
                headerLeft: () =>  user ?
                    <Feather 
                        name={'menu'} 
                        color={colors.primary} 
                        style={{paddingStart: 10}} 
                        size={25} 
                        onPress={() => navigation.openDrawer()}
                    /> 
                    : <View style={{justifyContent: 'center', alignItems: 'center', paddingEnd: 7}}>
                        <Ionicons 
                            name={'log-out-outline'} 
                            color={colors.primary} 
                            size={25} 
                            onPress={() => setId("")}
                        />
                        <Text style={{color: colors.primary}}>התנתק</Text>
                    </View>,
                headerRight: () => props.navigation.getState().index > 0 && 
                    <Ionicons 
                        name={'arrow-back'} 
                        style={{paddingEnd: 10}} 
                        size={25}
                        color={colors.primary}
                        onPress={() => props.navigation.pop()}
                    />
            })}
            
        >
            {user && <Stack.Screen name="EventsScreen" component={EventsScreen}/>}
            <Stack.Screen name="EventScreen" component={EventScreen}/>
            <Stack.Screen name="UpdateEventScreen" component={UpdateEventScreen}/>
            <Stack.Screen name="CheckListScreen" component={CheckListScreen}/>
            <Stack.Screen name="RsvpsScreen" component={RsvpsScreen}/>
            <Stack.Screen name="TablesScreen" component={TablesScreen}/>
            <Stack.Screen name="InvitationScreen" component={InvitationScreen}/>
            {user && <Stack.Screen name="ReceptionScreen" component={ReceptionScreen}/> }
            <Stack.Screen name="EditTableScreen" component={EditTableScreen}/>  
        </Stack.Navigator>
    )
} 

const AddStackScreen = ({navigation}) => {
    const { colors } = useTheme()
    return (
        <Stack.Navigator
            screenOptions = {{
                headerTitleAlign: 'center',
                headerTitle: () => <Header />,
                headerLeft: () => 
                    <Feather 
                        name={'menu'} 
                        color={colors.primary} 
                        style={{paddingStart: 10}} 
                        size={25} 
                        onPress={() => navigation.openDrawer()}
                    />,
            }}
        >
            <Stack.Screen name="AddScreen" component={AddScreen}/>
        </Stack.Navigator>
    )
}
const Drawer = createDrawerNavigator();

export default function AppNav() { 
    const {user,isLoading} = useContext(LoginContext)
    const { id } = useContext(IdContext)
    return (
        <NavigationContainer>
            {user ? 
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                drawerPosition='right'
                drawerContent={props => <DrawerContent {...props}/>}
            >
                <Drawer.Screen name="Home" component={HomeStackScreen} />
                <Drawer.Screen name="Add" options={{unmountOnBlur:true}} component={AddStackScreen} />
                <Drawer.Screen name="Events" options={{unmountOnBlur:true}} component={EventsStackScreen} />
            </Drawer.Navigator>
            : id != '' ? <EventsStackScreen />
            : isLoading ? <LoadingScreen />
            : <LoginScreen />
            } 
        </NavigationContainer>
    )
}