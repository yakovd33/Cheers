import React from 'react'
import { View ,Text, StyleSheet} from 'react-native'
import Task from './Task'
import { scale, fontScale } from 'react-native-utils-scale'
export default function Chunk({chunk, handleClick}) {
    const list = chunk.list.map((item) => <Task handleClick={handleClick} key={item.key} id={item.key} row={chunk.key} task={item.text} done={item.done}/>)
    return (
        <View style={{...styles.container, backgroundColor: chunk.backgroundColor}}>
            <Text style={styles.header}>
                {chunk.title}
            </Text>
            {list}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
    },
    header: {
        textAlign: 'center',
        fontSize: fontScale(25),
        textDecorationLine: 'underline'
    }
})
