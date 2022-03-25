import React from 'react'
import { View } from 'react-native'
import Table from './Table';

export default function Tables({ tables, action }) {
    return (

        <View style={{alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center'}}>
            {tables.map((item) => 
                <Table 
                    action={action}
                    key={item.key} 
                    table={item}
                />)}
        </View>
        
    )
}
