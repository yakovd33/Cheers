import React, {useState} from 'react'
import { View,Text, StyleSheet } from 'react-native'
import EventInput from './EventInput'
import { useTheme } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { dateToString , dateToTimeString} from '../../../utils/Methods';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { scale, fontScale } from 'react-native-utils-scale'

export default function DateTimePickerCom({header, data, setData, mode}) {
    const [show, setShow] = useState(false);
    const { colors } = useTheme()

    const handleClick = () =>{
        setShow(true);
    }
    return (
        <View style={styles.dateContainer}>
            <View style={styles.dateContainer}>
                <Text style={styles.inputTitle}>{header}</Text>
                <EventInput data={mode == 'date' ? dateToString(data) : dateToTimeString(data)} handleClick={handleClick}/> 
            </View>
            <MaterialIcons name={mode == 'date' ? 'date-range' : 'access-time'} size={22} color={colors.primary} style={{padding: 13}}/>        
            <DatePicker
                modal
                mode={mode}
                open={show}
                date={data}
                onConfirm={(date) => {
                    setShow(false)
                    setData(date)
                }}
                onCancel={() => {setShow(false)}}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    inputTitle: {
        padding: 15,
        fontSize: fontScale(16),
        color: '#5F6A6A',     
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})