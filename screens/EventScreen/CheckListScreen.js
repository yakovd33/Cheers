import React, { useContext, useState } from 'react'
import { ScrollView, View} from 'react-native'
import Chunk from '../../Components/Screens/EventScreen/CheckListScreen/Chunk'
import PageTitle from '../../Components/Shared/PageTitle'                
import FirebaseUtil from '../../utils/FirebaseUtils'
import { IdContext } from '../../utils/IdContext'

export default function CheckListScreen({ route }) {
    const { id } = useContext(IdContext)
    const { event } = route.params
    const [checkList, setCheckList] = useState(event.checkList)
    
    const handleClick = (row,index) => {
        let newCheckList = [...checkList]
        newCheckList[row-1].list[index-1].done = !newCheckList[row-1].list[index-1].done
        setCheckList(newCheckList)
        FirebaseUtil.UpdateCheckList(id,newCheckList)
    }

    return (
        <ScrollView style={{flex: 1,}}>
            <PageTitle name={'רשימת משימות'}/>
            <View style={{marginVertical: 10}}>
                {checkList.map((item) => {
                    return <Chunk key={item.key} chunk={item} handleClick={handleClick}/>}
                )}
            </View>
        </ScrollView>
    )
}
