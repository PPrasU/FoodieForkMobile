import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {ArrowLeft, AddSquare, Add} from 'iconsax-react-native';
import {fontType} from '../../../theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <ArrowLeft onPress={() => navigation.goBack()} size={24} color="#000" />
      <Text style={styles.title}>Berikan Penilaian Anda</Text>
    </View>
  );
};

const RatingStyle = StyleSheet.create({
  ratingSection: {
    justifyContent: 'space-between',
  },
  headerRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRating: {
    fontSize: 26,
    fontFamily: fontType['Monday-Ramen'],
    paddingHorizontal: 8,
    marginTop: 10,
  },
  bintangRating: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ratingItem: {
    flexDirection: 'row',
    marginRight: 10,
  },
  magicStar: {
    color: '#F5A623',
    transform: [{rotate: '-30deg'}],
  },
  star1: {
    color: '#000',
  },
  textInput: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 100,
  },
  inputText: {
    fontSize: 16,
  },
  gambarInput: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});

const MainContent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {dataPenilaian, selectedItemId} = route.params;
  const selectedItem = dataPenilaian.find(item => item.id === selectedItemId);
  const [ratingData, setRatingData] = useState({
    rasa: '',
    pelayanan: '',
    kepuasan: '',
    kenyamanan: '',
  });
  const handleChange = (key, value) => {
    setRatingData({
      ...ratingData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const postDataToFirebase = async () => {
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const reference = storage().ref(`ratingimages/${filename}`);

    setLoading(true);
    try {
      await reference.putFile(image);
      const url = await reference.getDownloadURL();
      await firestore().collection('rating').add({
        rasa: ratingData.rasa,
        pelayanan: ratingData.pelayanan,
        kepuasan: ratingData.kepuasan,
        kenyamanan: ratingData.kenyamanan,
        image: url,
        idPesanan: selectedItem.idPesanan,
        tanggalPesanan: selectedItem.tanggalPesanan,
        hargaText: selectedItem.hargaText,
        paketPromoText: selectedItem.paketPromoText,
        gambarPesanan: selectedItem.imageMenu,
      });
      setLoading(false);
      console.log('Berhasil Melakukan Penilaian!');
      navigation.navigate('PenilaianScreens');
    } catch (error) {
      console.log(error);
    }
  };
  const handleImagePenilaian = async () => {
    ImagePicker.openPicker({
      width: 1920,
      height: 1080,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.mainContent}>
      <View style={styles.ratingContent}>
        <View style={styles.ratingInfo}>
          <Image
            source={{uri: selectedItem.imageMenu}}
            style={styles.ratingPic}
          />
          <View style={styles.textContainer}>
            <Text style={styles.idPesanan}>{selectedItem.idPesanan}</Text>
            <Text style={styles.tanggalPesanan}>
              {selectedItem.tanggalPesanan}
            </Text>
            <Text style={styles.hargaText}>{selectedItem.hargaText}</Text>
          </View>
        </View>
        <Text style={styles.paketPromoText}>{selectedItem.paketPromoText}</Text>
      </View>
      <ScrollView>
        <Text style={RatingStyle.titleRating}>Rasa</Text>
        <View style={RatingStyle.textInput}>
          <TextInput
            placeholder="Deskripsikan rasa dari makanan tersebut ..."
            value={ratingData.rasa}
            onChangeText={text => handleChange('rasa', text)}
            placeholderTextColor="#8a8a8a"
            borderWidth={0}
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={RatingStyle.titleRating}>Pelayanan</Text>
        <View style={RatingStyle.textInput}>
          <TextInput
            placeholder="Deskripsikan pelayanan dari makanan tersebut ..."
            value={ratingData.pelayanan}
            onChangeText={text => handleChange('pelayanan', text)}
            placeholderTextColor="#8a8a8a"
            borderWidth={0}
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={RatingStyle.titleRating}>Kepuasan</Text>
        <View style={RatingStyle.textInput}>
          <TextInput
            placeholder="Deskripsikan kepuasan dari makanan tersebut ..."
            value={ratingData.kepuasan}
            onChangeText={text => handleChange('kepuasan', text)}
            placeholderTextColor="#8a8a8a"
            borderWidth={0}
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={RatingStyle.titleRating}>Kenyamanan</Text>
        <View style={RatingStyle.textInput}>
          <TextInput
            placeholder="Deskripsikan kenyamanan dari makanan tersebut ..."
            value={ratingData.kenyamanan}
            onChangeText={text => handleChange('kenyamanan', text)}
            placeholderTextColor="#8a8a8a"
            borderWidth={0}
            underlineColorAndroid="transparent"
          />
        </View>
        {image ? (
          <View style={{position: 'relative', marginVertical: 20, marginHorizontal: 10,}}>
            <Image
              style={{width: '100%', height: 165, borderRadius: 5}}
              source={{
                uri: image,
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: "#b3b3b3",
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color="#000"
                style={{transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleImagePenilaian}>
            <View
              style={[
                styles.borderImagePenilaian,
                {
                  gap: 10,
                  paddingVertical: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AddSquare color="#000" variant="Linear" size={42} />
              <Text
                style={{
                  fontSize: 12,
                  color: "#000",
                }}>
                Masukkan Gambar
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#3557e1" />
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => postDataToFirebase()}>
        <Text style={styles.buttonText}>Nilai</Text>
      </TouchableOpacity>
    </View>
  );
};

const Form = () => {
  return (
    <View style={styles.container}>
      <Header />
      <MainContent />
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#A9A9A9',
    paddingBottom: 10,
    alignItems: "center",
  },
  mainContent: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontFamily: fontType['Monday-Ramen'],
    marginLeft: 27,
  },
  ratingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    marginLeft: 5,
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ratingPic: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    width: 120,
    height: 120,
  },
  textContainer: {
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  idPesanan: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  tanggalPesanan: {
    fontSize: 14,
    color: 'black',
    marginRight: 10,
    marginTop: 10,
  },
  hargaText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 50,
    marginLeft: 170,
  },
  paketPromoText: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    marginLeft: -130,
  },
  imageInput: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    paddingVertical: 26,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    minWidth: 170,
    height: 120,
    borderRadius: 8,
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#A9A9A9',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderImagePenilaian: {
    borderStyle: 'dashed',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginVertical: 20,
    marginHorizontal: 10,
  },
});

export default Form;
