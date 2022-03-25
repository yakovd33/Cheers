import React, {useContext, useEffect, useState} from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { useTheme } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ScreenOption from './ScreenOption'
import Card from '../../Shared/Card'
import { LoginContext } from '../../../utils/LoginProvider'

export default function Menu({event, navigation}) {
    const iconSize = useWindowDimensions().width / 8
    const { user } = useContext(LoginContext)
    const { colors } = useTheme()
    const [loading, setLoading] = useState(true)
    const [menu, setMenu] = useState([{
            icon: <MaterialIcons name={'published-with-changes'} size={useWindowDimensions().width / 8} color={colors.primary}/>,
            screenName: 'UpdateEventScreen',
            screenText: 'עדכן אירוע',
            key:1,
        },{
            icon: <MaterialCommunityIcons name={'email-check-outline'} size={iconSize} color={colors.primary}/>,
            screenName: 'RsvpsScreen',
            screenText: 'אישורי הגעה',
            key: 2,
        },{
            icon: <FontAwesome5 name={'chair'} size={iconSize} color={colors.primary}/>,
            screenName: 'TablesScreen',
            screenText: 'סידורי ישיבה',
            key: 3,
        },{
            icon: <FontAwesome5 name={'envelope-open-text'} size={iconSize} color={colors.primary}/>,
            screenName: 'InvitationScreen',
            screenText: 'עיצוב הזמנות',
            key: 4,
        },user && {
            icon: <FontAwesome5 name={'concierge-bell'} size={iconSize} color={colors.primary}/>,
            screenName: 'ReceptionScreen',
            screenText: 'קבלת פנים',
            key: 5,
        },event.type === 'חתונה' && {
            icon: <FontAwesome5 name={'list-ol'} size={iconSize} color={colors.primary}/>,
            screenName: 'CheckListScreen',
            screenText: 'רשימת משימות',
            key: 6,
        }
    ])

    useEffect(() => {
        const newMenu = [...menu]
        setMenu(newMenu.filter((item) => item !== false))
        setLoading(false)
        return () => {}
    }, [])
    
    return (
        !loading && <View style={{marginHorizontal: 15, marginVertical: 10}}>
            <Card>
                <View style={styles.container}>
                    {menu.map((item) => 
                        item !== null && <ScreenOption 
                            key={item.key} 
                            icon={item.icon} 
                            screenName={item.screenName} 
                            screenText={item.screenText} 
                            navigation={navigation}
                             event={event} 
                        />)}
                </View>  
            </Card>
        </View>
            
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom: 8,
    }
})
