import React, { useEffect, useState } from "react";
import { Animated, Easing, Image, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Portal, Modal } from 'react-native-paper';
const { height } = Dimensions.get('screen');
export default Invatations = ({ frontUri, backUri, visible, setVisibility }) => {
  const [front, setFront] = useState(true);
  const [rotated, setRotated] = useState(false);
  const [uri, setUri] = useState(frontUri);
  const animation = useState(new Animated.Value(1))[0];

  useEffect(() => {
    console.log('modal image uri', uri);
  }, [uri])

  const CallAnimation = () => {
    setFront(!front);
    animation.setValue(0);
    setRotated(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }

  const RotateData = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });
  RotateData.addListener((res) => {
    const deg = res.value.split('d');
    if (parseInt(deg[0]) >= 80 && parseInt(deg[0]) < 83) {
      setUri(front ? frontUri : backUri);
    }
  });

  return (<View>
    <Portal>
      <Modal visible={visible} onDismiss={() => setVisibility(false)} contentContainerStyle={{ backgroundColor: 'white', alignContent: 'center', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, borderRadius: 25, height: '80%', margin: 30 }}>
        <TouchableOpacity onPress={CallAnimation}>
          <Text style={{ marginTop: 5, textAlign: 'center', }}>לחצו לסיבוב התמונה</Text>
        </TouchableOpacity>
        <Animated.View style={{ transform: [{ rotateY: RotateData }] }} >
          <TouchableOpacity onPress={() => { CallAnimation() }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
              <Image source={{ uri: uri }} style={{
                height: height / 3 * 2, width: height / 3,
                resizeMode: 'contain'
              }} />

            </View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </Portal>
  </View>)
}