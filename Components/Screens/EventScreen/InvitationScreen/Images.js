import React, {useContext, useEffect, useState} from 'react'
import { View, Image, Text, useWindowDimensions, Pressable, Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Card from '../../../Shared/Card';
import storage from '@react-native-firebase/storage'
import { IdContext } from '../../../../utils/IdContext';
import { Avatar, useTheme } from 'react-native-paper';
import mainWedding from '../../../../images/mainWedding.jpg'

import { scale, fontScale } from 'react-native-utils-scale'

export default function Images({celebrator, partner, topIcons}) {
    const [mainImg, setMainImg] = useState(true)
    const [celebratorImg, setCelebratorImg] = useState(true)
    const [partnerImg, setPartnerImg] = useState(true)
    const [changed, setChanged] = useState(false)
    const width = useWindowDimensions().width
    const { id } = useContext(IdContext)
    const { colors } = useTheme()
    
    const loadImage = async (imageType) => {
    
            let height = (width - 40) / 1.5
            if (imageType !== 'main') {
                height = width - 40
            }
            const image = await ImagePicker.openPicker({
                width: width - 40,
                height: height,
                cropping: true
            }).catch(error => console.log(error))
           
            if (image !== undefined){
                const imageUri = Platform.OS == 'android' ?  image.path : image.sourceURL
                try {
                    await storage().ref(id + '/' + imageType).putFile(imageUri)
                    setChanged(!changed)
                    alert('תמונה הועלתה')
                } catch(e) {
                    console.log(e)
                }
            } 
        
    }

    useEffect(() => {
        const fetch = async () => {
            try {
                const celebratorUrl = await storage().ref(id + '/celebrator').getDownloadURL()
                setCelebratorImg(celebratorUrl)
            } catch {}
            try {
                const partnerUrl = await storage().ref(id + '/partner').getDownloadURL()
                setPartnerImg(partnerUrl)
            } catch {}
            try {
                const mainUrl = await storage().ref(id + '/main').getDownloadURL()
                setMainImg(mainUrl)
            } catch {}
        }
        fetch()
        return () => {}
    }, [changed])
    
    return (
        <View style={{marginTop: 15, justifyContent: 'center', alignItems: 'center'}}>
            <Card>
            <Text style={{fontSize: fontScale(18), margin: 5, fontWeight: 'bold', writingDirection: 'rtl'}}>תמונות להזמנה (לחץ על התמונות לשנות)</Text>
                <Pressable onPress={() => loadImage('main')}>
                    <Image
                        style={{width: width - 40, height: (width - 40) / 1.5, margin: 5, justifyContent: 'center'}} 
                        source={mainImg !== true ? {uri: mainImg} : mainWedding}> 
                    </Image>
                </Pressable>
                
                <Text style={{fontSize: fontScale(24), margin: 5, textAlign: 'center'}}>תמונה ראשית</Text>
            
                {topIcons && <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Pressable onPress={() => loadImage('celebrator')} style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Avatar.Image size={width / 4.5} source={celebratorImg !== true ? {uri: celebratorImg}: {}} />
                        <Text style={{padding: 10, fontSize: fontScale(20), fontWeight: 'bold', color: colors.primary}}>התמונה של {celebrator.name}</Text>
                    </Pressable>

                    <Pressable onPress={() => loadImage('partner')} style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Avatar.Image size={width / 4.5} source={partnerImg !== true ? {uri: partnerImg} : {}} />
                        <Text style={{padding: 10, fontSize: fontScale(20), fontWeight: 'bold', color: colors.primary}}>התמונה של {partner.name}</Text>
                    </Pressable>
                </View>}
                
                
            </Card>
        </View>
        
    )
}
