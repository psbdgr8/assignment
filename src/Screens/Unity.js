import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import UnityView, {
  UnityModule,
  UnityResponderView,
} from 'react-native-unity-play';
import {useNavigation} from '@react-navigation/native';

const Unity = () => {
  const navigation = useNavigation();
  function Back() {
    // unloadUnity()
    navigation.goBack()
  }
  return (
    <View style={{flex: 1}}>
      <UnityView style={{ position: 'absolute', left: 0, right: 0, top: 1, bottom: 1 }} />
      <TouchableOpacity
        onPress={Back}
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          top: 20,
          padding: 10,
          borderRadius: 100,
          left: 10,
        }}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Unity;

const styles = StyleSheet.create({});
