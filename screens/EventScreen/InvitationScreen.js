import React, {useContext, useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Linking, Image} from 'react-native';
import Card from '../../Components/Shared/Card';
import PageTitle from '../../Components/Shared/PageTitle';
import {IdContext} from '../../utils/IdContext';
import {useTheme, TextInput, Button, ActivityIndicator} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import FirebaseUtil from '../../utils/FirebaseUtils';
import Switches from '../../Components/Screens/EventScreen/InvitationScreen/Switches';
import Images from '../../Components/Screens/EventScreen/InvitationScreen/Images';
import Icons from '../../Components/Screens/EventScreen/InvitationScreen/Icons';
import ThemeCards from '../../Components/Screens/EventScreen/InvitationScreen/ThemeCards';
import getBackgroundImages from '../../utils/backgroundImages';
import {scale, fontScale} from 'react-native-utils-scale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import InvatationsImagesModal from '../../Components/Shared/InvatationsImagesModal';
import PrintedInvatations from '../../Components/Screens/EventScreen/InvitationScreen/PrintedInvatations';

export default function InvitationScreen({route}) {
  const {event} = route.params;
  const [confetti, setConfetti] = useState(true);
  const [topIcons, setTopIcons] = useState(true);
  const [printedInvatations, setPrintedInvatations] = useState(true);
  const [brothers, setBrothers] = useState(true);
  const [ride, setRide] = useState(true);
  const [dish, setDish] = useState(true);
  const [hoopa, setHoopa] = useState(true);
  const [declaration, setDeclaration] = useState(true);
  const [background, setBackground] = useState('flowers');
  const [icon, setIcon] = useState('rings1');
  const [text, setText] = useState('');
  const {id} = useContext(IdContext);
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const [backgroundImages, setBackgroundImages] = useState({});

  const [visible, setVisibility] = useState(false);
  const [frontImage, setFrontImage] = useState();
  const [frontImageUri, setFrontImageUri] = useState();
  const [buttonImage, setButtonImage] = useState();
  const [buttonColor, setButtonColor] = useState('#ED7777');
  const [frontImageUplaoded, setFrontImageUploaded] = useState(false);
  const [backImage, setBackImage] = useState();
  const [backImageUri, setBackImageUri] = useState();
  const [backImageUploaded, setBackImageUploaded] = useState(false);
  const [repull, setRepull] = useState(false);

  const options = {
    mediaType: 'photo',
  };
  const uploadImage = async front => {
    await launchImageLibrary(options, res => {
      console.log('result from picker: ', res);
      if (res.assets) {
        if (!frontImageUplaoded && front) {
          setFrontImageUploaded(true);
        } else if (!backImageUploaded && !front) {
          setBackImageUploaded(true);
        }
        res.assets.map(({uri}) => {
          console.log('image uri', uri);
          front ? setFrontImageUri(uri) : setBackImageUri(uri);

          const buttonImage = (
            <Image
              resizeMode="cover"
              resizeMethod="resize"
              style={[
                {
                  width: 25,
                  height: 40,
                  resizeMode: 'contain',
                  transform: [{rotate: '10deg'}],
                  marginHorizontal: 5,
                },
              ]}
              source={{uri: uri}}
            />
          );
          front ? setFrontImage(buttonImage) : setBackImage(buttonImage);
        });
      }
    }).catch(e => console.log('error uploading photo ', e));
  };

  const handleClick = () => {
    FirebaseUtil.UpdateInvitation(id, {text: text});
  };
  const handlePrinted = () => {
    FirebaseUtil.UpdateInvitation(id, {printed: printedInvatations});
  };

  const switches = [
    {
      value: ride,
      setValue: setRide,
      head: '???????? ?????????',
      text: '?????????? ?????? ???????? ???????? ?????????? ?????????? ?????????? ????????????',
    },
    {
      value: dish,
      setValue: setDish,
      head: '?????????? ??????',
      text: '?????????? ?????????? ?????? ?????????? ?????????? ?????????? ????????????',
    },
    {
      value: confetti,
      setValue: setConfetti,
      head: '???????? ????????????',
      text: '???????? ???????????? ?????? ???????????? ???????????? ????????????',
    },
    {
      value: hoopa,
      setValue: setHoopa,
      head: '???????? ????????????????',
      text: '???????? ???????????????? ?????? ???????? ???????? ???????? ????????????',
    },
    {
      value: declaration,
      setValue: setDeclaration,
      head: '?????????? ????????????',
      text: '?????????? ???????????? ???????????? ????????????',
    },
    event.type === '??????????' && {
      value: topIcons,
      setValue: setTopIcons,
      head: '???????????? ????????',
      text: '???????????? ???????????? ???????? ????????????',
    },
    event.type !== '??????????' && {
      value: brothers,
      setValue: setBrothers,
      head: '???????? ??????????',
      text: '?????????? ???? ???????? ?????????? ?????? ???????? ???????? ??????????',
    },
    {
      value: printedInvatations,
      setValue: setPrintedInvatations,
      head: '???????????? ??????????????',
      text: '???????????? ???????????? ???? ?????????????? ????????????????',
    },
  ];

  useEffect(() => {
    console.log('doing');
    getBackgroundImages()
      .then(res => {
        setBackgroundImages(res);
      })
      .catch(e => {
        console.log('failed getting images:', e);
      });
    const subscriber = firestore()
      .collection('invitations')
      .doc(id)
      .onSnapshot(settings => {
        const isPrinted = settings.data().frontPrinted ? true : false;
        setDish(settings.data().dish);
        setConfetti(settings.data().confetti);
        setRide(settings.data().ride);
        setHoopa(settings.data().hoopa);
        setBackground(settings.data().background);
        setIcon(settings.data().icon);
        setText(settings.data().text);
        setTopIcons(settings.data().topIcons);
        setDeclaration(settings.data().declaration);
        setBrothers(settings.data().brothers);
        setFrontImageUri(settings.data().frontPrinted);
        setPrintedInvatations(settings.data().printed);

        setLoading(false);
      });
    return () => {
      subscriber();
    };
  }, []);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <ScrollView>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <PageTitle name={'?????????? ????????????'} />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            padding: 10,
            borderColor: colors.primary,
            borderWidth: 3,
            borderStyle: 'dotted',
            borderRadius: 20,
            marginHorizontal: 15,
            marginTop: 5,
          }}
          onPress={() => Linking.openURL('https://cheersron-cb77b.web.app/?id=' + id)}>
          <Ionicons name="mail-open-outline" size={20} color={colors.primary} />
          <Text
            style={{
              fontSize: fontScale(20),
              color: colors.primary,
              writingDirection: 'rtl',
            }}>
            ?????? ????????????
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{margin: 15}}>
        <Card>
          <Text
            style={{
              fontSize: fontScale(20),
              padding: 5,
              fontWeight: 'bold',
              writingDirection: 'rtl',
            }}>
            ?????????? ??????????
          </Text>
          <ThemeCards
            background={background}
            backgroundImages={backgroundImages}
            setTrigger={setRepull}
            trigger={repull}
          />
          <Text
            style={{
              fontSize: fontScale(20),
              padding: 5,
              fontWeight: 'bold',
              writingDirection: 'rtl',
            }}>
            ???????????? ??????????
          </Text>
          <Icons picked={icon} />
        </Card>
        <Images celebrator={event.celebrator} partner={event.partner} topIcons={topIcons} />
        <View style={{marginVertical: 15}}>
          <Card>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 8,
              }}>
              <Text
                style={{
                  fontSize: fontScale(20),
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}>
                ???????? ??????????
              </Text>
              <Button
                style={{height: 35}}
                contentStyle={{flexDirection: 'row-reverse'}}
                icon={() => <MaterialIcons name={'add-circle-outline'} size={20} color={'white'} />}
                mode="contained"
                onPress={() => handleClick()}>
                <Text style={{fontSize: fontScale(12), color: 'white'}}>????????</Text>
              </Button>
            </View>
            <TextInput
              placeholder={'???????? ??????????'}
              multiline={true}
              numberOfLines={4}
              onChangeText={setText}
              value={text}
              style={{margin: 5, textAlign: 'right'}}
              mode={'outlined'}
            />
          </Card>
          <InvatationsImagesModal
            frontUri={frontImageUri}
            backUri={backImageUri}
            visible={visible}
            setVisibility={setVisibility}
          />
          <PrintedInvatations
            id={id}
            toggle={printedInvatations}
            setVisibilty={setVisibility}
            setBackUri={setBackImageUri}
            setFrontUri={setFrontImageUri}
            handlePrinted={handlePrinted}
          />
        </View>
        <Switches switches={switches} />
      </View>
    </ScrollView>
  );
}
