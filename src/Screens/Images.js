import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

const Images = ({route}) => {
  const navigation = useNavigation();
  let imageList = route.params;
  if(imageList.imageList.length > 30){
    imageList.imageList.splice(30, imageList.imageList.length );
  }
  const [image1, setImage] =useState(imageList)
  const [index, setIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);

  function Home() {
    navigation.replace('Home');
  }

  function Delete() {
    setRefresh(prevRefresh => !prevRefresh);
    if (index > 0) {
      image1.imageList.splice(index, 1);
      setIndex(index-1);
    }
    else if (index === 0 && image1.imageList.length > 1) {
      image1.imageList.splice(index, 1);
      setIndex(index);
    }
    else if (index === 0 && image1.imageList.length === 1) {
      image1.imageList.splice(index, 1);
      setIndex(index-1);
    }
    else if (image1.imageList.length === 0) {
      Alert.alert(
        'No Images',
        'Please add some Images',
        [
          {text: 'ok', onPress: null},
        ],
        {
          cancelable: true,
          onDismiss: () => null,
        },
      );
    }
  }
  function AddNew(){
  let NewList = [];
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
      image1.imageList.splice(index+1, 0, {
        path: image.path,
      })
      console.log(imageList)
      setRefresh(1)
    })
  })
  setRefresh(prevRefresh => !prevRefresh);
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{flex: 0.8, marginTop: 50, justifyContent: 'center'}}>
        {index >= 0 ? (
          <Image
            style={styles.mainImage}
            source={{
              uri: image1.imageList[index].path,
            }}
          />
        ) : (
          <Text style={styles.noImage}>No Image, please add {'\n'} some images to continue.</Text>
        )}
      </View>
      <View style={styles.topIconView}>
        <TouchableOpacity onPress={Home}>
          <Icon name="clear" iconStyle={styles.iconTop} />
        </TouchableOpacity>
        <TouchableOpacity onPress={Delete}>
          <Icon
            name="trash-can-outline"
            type="material-community"
            iconStyle={styles.iconTop}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomBar}>
          <Icon name="add-circle" onPress={AddNew} iconStyle={styles.bottomIcon} />
          <View style={styles.textField}>
            {index >= 0 ? (
              <Text style={styles.text}>Image{index + 1}</Text>
            ) : (
              <Text style={styles.text}>No Image</Text>
            )}
          </View>
          <Icon name="cloud-upload" iconStyle={styles.bottomIcon} />
        </View>
        <View style={styles.bottomBar2}>
          <GestureHandlerRootView>
            <DraggableFlatList
              alwaysBounceHorizontal
              horizontal
              extraData={refresh}
              data={image1.imageList}

              renderItem={({item, index, drag}) => (
                <TouchableOpacity
                  onLongPress={drag}
                  key={index}
                  onPress={() => setIndex(index)}>
                  <ImageBackground
                    style={styles.bottomImage}
                    source={{
                      uri: item.path,
                    }}>
                    <Text style={styles.imageNum}>{index + 1}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              onDragEnd={({ data }) => setImage({"imageList": data} )}
            />
          </GestureHandlerRootView>
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
    flex: 0.2,
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
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  bottomImage: {
    height: 70,
    width: 70,
    margin: 2,
    resizeMod: 'center',
  },
  imageNum: {
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
    right: 5,
    top: 3,
    textShadowRadius: 2,
    elevation: 3,
    shadowOpacity: 1,
    shadowColor: '#000000',
    textShadowOffset: {width: 1.5, height: 2.5},
  },
  noImage: {
    color: '#000000',
    fontSize: 30,
    alignSelf: 'center',
    textAlignVertical: 'center',
    textAlign:'center',
    margin: 20
  },
});
