import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const Images = ({route}) => {
  const navigation = useNavigation();
  const imageList = route.params;
  const [list, setList] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [index, setIndex] = useState(1);
  console.log(imageList.length)

  function Home() {
    navigation.replace('Home');
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{flex: 0.8, marginTop: 50}}>
        <Image
          style={styles.mainImage}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </View>
      <View style={styles.topIconView}>
        <TouchableOpacity onPress={Home}>
          <Icon name="clear" iconStyle={styles.iconTop} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="trash-can-outline"
            type="material-community"
            iconStyle={styles.iconTop}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomBar}>
          <Icon name="add-circle" iconStyle={styles.bottomIcon} />
          <View style={styles.textField}>
            <Text style={styles.text}>Image{index}</Text>
          </View>
          <Icon name="cloud-upload" iconStyle={styles.bottomIcon} />
        </View>
        <View style={styles.bottomBar2}>
          <FlatList horizontal data={imageList} />
        </View>
      </View>
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  topIconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 15,
    right: 15,
    top: 30,
  },
  iconTop: {
    color: 'white',
    fontSize: 40,
    textShadowOffset: {width: -1, height: 2},
    shadowColor: '#000000',
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  bottom: {
    backgroundColor: 'black',
    flex: 0.3,
  },
  bottomIcon: {
    color: '#2272b5',
    fontSize: 35,
  },
  bottomBar: {
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  textField: {
    flex: 1,
    backgroundColor: 'white',
    height: 32,
    marginHorizontal: 5,
    borderRadius: 12,
    justifyContent: 'center',
    paddingLeft: 10,
    marginTop: 2,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  bottomBar2: {
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  mainImage: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
