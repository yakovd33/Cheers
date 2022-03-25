import React, { useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { getColorFromURL } from 'rn-dominant-color';
import { Image, View, TouchableOpacity, Text, useWindowDimensions, Platform } from 'react-native';
import storage from '@react-native-firebase/storage';
import FirebaseUtil, { getBackgroundImage } from '../../../../utils/FirebaseUtils';
import { useTheme } from 'react-native-paper';






export default PrintedInvatations = ({ id, toggle, setFrontUri, setBackUri, setVisibilty,handlePrinted }) => {
    const { colors } = useTheme()
    const defaultColor = colors.primary;
    const [frontImage, setFrontImage] = useState();
    const [buttonColor, setButtonColor] = useState(defaultColor)
    const [backImage, setBackImage] = useState();
    const imagesStore = storage().ref(id);

    const width = useWindowDimensions().width
    const height = useWindowDimensions().height


    useEffect(() => {
        getPrintedImages();
    }, [])
    useEffect(() => {
        handlePrinted();
    }, [toggle])
    const getPrintedImages = () => {
        if (imagesStore) {
            imagesStore.list().catch(e => {
                console.log('could not fetch images list from storage: ', e);
            }).then((items) => {
                console.log('items:', items.items)
                items.items.forEach(item => {
                    console.log(item);
                    if (item.path.includes('back')) {
                        imagesStore.child('back').getDownloadURL().then(res => {

                            if (res) {
                                const buttonImage = <Image
                                    resizeMode="cover"
                                    resizeMethod="resize"
                                    style={[{ width: 25, height: 50, resizeMode: 'contain', transform: [{ rotate: '100deg' }], marginHorizontal: 5 }]}
                                    source={{ uri: res }} />
                                console.log('back image url', res);
                                setBackUri(res);
                                setBackImage(buttonImage);

                            }
                        }).catch((e) => {
                            console.log('couldn\'t fetch image: ', e);
                        });
                    }
                    if (item.path.includes('front')) {
                        imagesStore.child('front').getDownloadURL().then(res => {
                            const buttonImage = <Image
                                resizeMode="cover"
                                resizeMethod="resize"
                                style={[{ width: 25, height: 50, resizeMode: 'contain', transform: [{ rotate: '100deg' }], marginHorizontal: 5 }]}
                                source={{ uri: res }} />
                            setFrontUri(res);
                            setFrontImage(buttonImage);
                            getColorFromURL(res).then((colors) => {
                                if (colors.detail === "#000000") {
                                    if (colors.secondary === "#000000") {
                                        setButtonColor(defaultColor);
                                    } else {
                                        setButtonColor(colors.secondary);
                                    }
                                } else {
                                    setButtonColor(colors.detail);
                                    getColorFromURL(res).then((colors) => {
                                        console.log(colors);
                                        if (colors.detail === "#000000") {
                                            if (colors.secondary === "#000000") {
                                                setButtonColor(defaultColor);
                                            } else {
                                                setButtonColor(colors.secondary);
                                            }
                                        } else {
                                            setButtonColor(colors.detail);
                                        }
                                    });
                                }
                            });
                        }).catch((e) => {
                            console.log('couldn\'t fetch image: ', e);
                        });
                    }


                })
            });

        }
    }


    const uploadImage = async (front) => {

        const image = await ImagePicker.openPicker({
            cropping: true
        }).catch(error => console.log(error))
        console.log('image details to upload: ', image);
        if (image !== undefined) {
            const imageUri = Platform.OS == 'android' ? image.path : image.sourceURL;
            front ? setFrontUri(imageUri) : setBackUri(imageUri);
            const buttonImage = <Image
                resizeMode="cover"
                resizeMethod="resize"
                style={[{ width: 25, height: 50, resizeMode: 'contain', transform: [{ rotate: '100deg' }], marginHorizontal: 5 }]}
                source={{ uri: imageUri }} />
            getColorFromURL(imageUri).then((colors) => {
                console.log(colors);
                if (colors.detail === "#000000") {
                    if (colors.secondary === "#000000") {
                        setButtonColor(defaultColor);
                    } else {
                        setButtonColor(colors.secondary);
                    }
                } else {
                    setButtonColor(colors.detail);
                }
            });
            console.log('front image? ', front);
            front ? setFrontImage(buttonImage) : setBackImage(buttonImage);
            try {

                await storage().ref(id + '/' + (front ? 'front' : 'back')).putFile(imageUri)
                    .then((res) => {
                        console.log(res.metadata.fullPath)
                        const uri = storage().ref(res.metadata.fullPath).getDownloadURL().then((res) => {
                            FirebaseUtil.setPrintedInvatation(id, res, front);
                            
                        }).catch((e) => {
                            console.log('failed getting uri:', e);
                        });

                    })
                    .catch((e) => {
                        console.log('error uploading image:', e);
                        alert('קרתה שגיאה בהעלאת התמונה אנא נסו שנית');
                        front ? setFrontImage() : setBackImage();
                    })
            } catch (e) {
                console.log(e)
            }
        }

    }

    return (toggle && <View>
        {frontImage && backImage && <TouchableOpacity style={{ marginHorizontal: '30%', marginTop: 10, borderRadius: 50, padding: 10, backgroundColor: `${buttonColor}`, maxWidth: '45%', flexWrap: 'wrap' }}
            labelStyle={{ flexWrap: 'wrap' }} mode='contained' onPress={() => setVisibilty(true)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                {frontImage}
                <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 14, flexWrap: 'wrap', color: "#FFFFFF", textAlign: 'center' }}>לצפייה בהזמנה המודפסת</Text>
            </View>
        </TouchableOpacity>}
        <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginVertical: 5, borderRadius: 50, padding: 10, backgroundColor: `${buttonColor}`, maxWidth: '45%', flexWrap: 'wrap' }}
                labelStyle={{ flexWrap: 'wrap' }} mode='contained' onPress={() => uploadImage(true)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    {frontImage}
                    <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 14, flexWrap: 'wrap', color: "#FFFFFF", textAlign: 'center' }}>העלאת תמונה לצד הקדמי</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 5, borderRadius: 50, padding: 10, backgroundColor: `${buttonColor}`, maxHeight: 80, maxWidth: '45%', flexWrap: 'wrap' }}
                labelStyle={{ flexWrap: 'wrap' }} mode='contained' onPress={() => uploadImage(false)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    {backImage}
                    <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 14, color: '#FFFFFF', textAlign: 'center', flexWrap: 'wrap' }}> העלאת תמונה לצד האחורי</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>)
}