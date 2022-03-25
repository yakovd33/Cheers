import React from 'react'
import { View } from 'react-native'
import Card from '../../../Shared/Card'
import SwitchContainer from './SwitchContainer'

export default function Switches({switches}) {
    
    return (
        <View>
            <Card>
                {switches.filter((s) => s !== false).map((item) =>
                    <SwitchContainer 
                        key={item.head}
                        value={item.value} 
                        setValue={item.setValue}
                        head={item.head}
                        text={item.text}
                    />
                )}
            </Card>
        </View>
    )
}
