import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React, {useCallback, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import UnityView from 'react-native-unity-play';
import {LogBox} from "react-native";
import { Icon } from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker';

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])

const HomeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState({});
  const [visible, setVisible] = useState(false)

 const openImagePicker = () => {
  let imageList = [];
  ImagePicker.openPicker({
    multiple: true,
    waitAnimationEnd: false,
    includeExif: true,
    forceJpg: true,
    compressImageQuality: 0.8,
    maxFiles: 30,
    mediaType:'photo',
    includeBase64: true
  }).then(response => {
    response.map(image => {
      imageList.push({
        filename: image.filename,
        path: image.path,
        data: image.data
      })
      setImage(imageList)
    })
  }).then(() => {
    navigation.navigate('Image', {imageList: imageList} )
  })
  .catch(e => console.log("Error",e.message)); 
 };

if(visible){
  return(
    <View style={{flex: 1}}>
      <UnityView style={{ position: 'absolute', left: 0, right: 0, top: 1, bottom: 1 }} />
      <TouchableOpacity
        onPress={() => setVisible(false)}
        style={{
          position: 'absolute',
          top: 30,
          left: 20,
        }}>
        <Icon name='arrow-back-ios'/>
      </TouchableOpacity>
    </View>
  )
}
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.button}>
        <Text style={styles.text}>Launch Unity</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openImagePicker} style={styles.button}>
        <Text style={styles.text}>Select Photos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5242EC',
    width: 180,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 21,
    color: '#ffffff',
    fontWeight: '700',
  },
});
