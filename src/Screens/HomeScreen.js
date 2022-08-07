import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React, {useCallback, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState({});

  const chooseImage = useCallback(() => {
    const options = {
      selectionLimit: 30,
      mediaType: 'photo',
      includeBase64: false,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        setImage(response)
      }
    });
  }, []);
  function Unity(){
navigation.navigate('Unity');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Unity} style={styles.button}>
        <Text style={styles.text}>Launch Unity</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={chooseImage} style={styles.button}>
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
