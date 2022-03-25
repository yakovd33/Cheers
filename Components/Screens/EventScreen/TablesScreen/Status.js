import React, {useState, useEffect} from 'react'
import { View, Text, useWindowDimensions } from 'react-native'
import { useTheme } from 'react-native-paper'
import { tablesStatus } from '../../../../utils/Methods'
import Card from '../../../Shared/Card' 
import { scale, fontScale } from 'react-native-utils-scale'

export default function Status({ tables }) {
    const { colors } = useTheme()
    const [status,setStatus] = useState([{
            head: 'סה"כ שולחנות',
            number: 0,
            color: 'blue'
        },{
            head: 'שולנות מלאים',
            number: 0,
            color: 'red',
        },{
            head: 'מקומות פנויים',
            number: 0,
            color: colors.primary
        },{
            head: 'מוזמנים יושבים',
            number: 0,
            color: 'green',
        },
    ])
    const width = useWindowDimensions().width

    useEffect(() => {
        const tableStatus = tablesStatus(tables)
        const newStatus = [...status]
        newStatus[0].number =  tableStatus['total']
        newStatus[1].number =  tableStatus['full']
        newStatus[2].number =  tableStatus['free']
        newStatus[3].number =  tableStatus['taken']
        setStatus(newStatus)
        return () => {}
    }, [tables])

    return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
            {status.map((item) =>
                <View style={{margin: 10,}} key={item.head}>
                    <Card>
                        <View style={{justifyContent: 'center', alignItems: 'center', width: width / 2 -25, paddingVertical: 30}}>
                            <Text style={{fontSize: fontScale(40), color: item.color, fontWeight: 'bold'}}>{item.number}</Text>
                            <Text style={{fontSize: fontScale(15), fontWeight: 'bold'}}>{item.head}</Text>
                        </View>
                    </Card>
                </View>)}
        </View>
        
    )
}
