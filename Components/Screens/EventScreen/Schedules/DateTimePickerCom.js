import React, {useState} from 'react'
import { View,Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import { dateToString , dateToTimeString} from '../../../../utils/Methods';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EventInput from '../../AddScreen/EventInput';

export default function DateTimePickerCom({data, setData, mode}) {
    const [show, setShow] = useState(false);
    const { colors } = useTheme()

    const handleClick = () =>{
        setShow(true);
    }
    return (
        <View style={styles.dateContainer}>
            <MaterialIcons name={mode == 'date' ? 'date-range' : 'access-time'} size={25} color={colors.primary} style={{padding: 13}}/>
            <View style={styles.dateContainer}>
                <EventInput data={mode == 'date' ? dateToString(data) : dateToTimeString(data)} handleClick={handleClick}/> 
            </View>              
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
    dateContainer: {
        paddingEnd: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
})
