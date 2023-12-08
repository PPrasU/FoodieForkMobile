import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ActivityIndicator } from "react-native";
import axios from "axios";
import { ArrowLeft } from "iconsax-react-native";
import { fontType } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const RatingStyle = StyleSheet.create({
  ratingSection: {
    justifyContent: 'space-between',
  },
  headerRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleRating:{
    fontSize: 26,
    fontFamily: fontType['Monday-Ramen'],
    paddingHorizontal: 8,
    marginTop: 10,
  },
  bintangRating: {
    flexDirection: "row",
    justifyContent: "center",
  },
  ratingItem: {
    flexDirection: "row",
    marginRight: 10,
  },
  magicStar: {
    color: "#F5A623",
    transform: [{ rotate: "-30deg" }],
  },
  star1: {
    color: "#000",
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
  gambarInput:{
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10, 
  },
})

const EditPenilaian = ({ route }) => {
  const navigation = useNavigation();
  const { penilaianId } = route.params;
  const [ratingData, setRatingData] = useState({
    rasa: "",
    pelayanan: "",
    kepuasan: "",
    kenyamanan: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPenilaianId();
  }, [penilaianId]);

  const getPenilaianId = async () => {
    try {
      const response = await axios.get(
        `https://656475e2ceac41c0761e3a27.mockapi.io/ffmobileapp/rating/${penilaianId}`
      );
      setRatingData({
        rasa: response.data.rasa,
        pelayanan: response.data.pelayanan,
        kepuasan: response.data.kepuasan,
        kenyamanan: response.data.kenyamanan,
        
        idPesanan: response.data.idPesanan,
        tanggalPesanan: response.data.tanggalPesanan,
        hargaText: response.data.hargaText,
        paketPromoText: response.data.paketPromoText,
        gambarPesanan: response.data.gambarPesanan,
      });

      setImage(response.data.image);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (key, value) => {
    setRatingData({
      ...ratingData,
      [key]: value,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(
        `https://656475e2ceac41c0761e3a27.mockapi.io/ffmobileapp/rating/${penilaianId}`,
        {
          rasa: ratingData.rasa,
          pelayanan: ratingData.pelayanan,
          kepuasan: ratingData.kepuasan,
          kenyamanan: ratingData.kenyamanan,
          image: image,
        }
      );

      setLoading(false);
      navigation.navigate("PenilaianScreens");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.mainContent}>
        <Text style={styles.title}>Berikan Penilaian Anda</Text>
        <View style={styles.ratingContent}>
          <View style={styles.ratingInfo}>
            <Image source={{ uri: ratingData.gambarPesanan }} style={styles.ratingPic} />
            <View style={styles.textContainer}>
              <Text style={styles.idPesanan}>{ratingData.idPesanan}</Text>
              <Text style={styles.tanggalPesanan}>{ratingData.tanggalPesanan}</Text>
              <Text style={styles.hargaText}>{ratingData.hargaText}</Text>
            </View>
          </View>
          <Text style={styles.paketPromoText}>{ratingData.paketPromoText}</Text>
        </View>
        <ScrollView>
          <Text style={RatingStyle.titleRating}>Rasa</Text>
          <View style={RatingStyle.textInput}>
            <TextInput
              placeholder="Deskripsikan rasa dari makanan tersebut ..."
              value={ratingData.rasa}
              onChangeText={(text) => handleChange("rasa", text)}
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
              onChangeText={(text) => handleChange("pelayanan", text)}
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
              onChangeText={(text) => handleChange("kepuasan", text)}
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
              onChangeText={(text) => handleChange("kenyamanan", text)}
              placeholderTextColor="#8a8a8a"
              borderWidth={0}
              underlineColorAndroid="transparent"
            />
          </View>

          <Text style={RatingStyle.titleRating}>Gambar</Text>
          <View style={RatingStyle.gambarInput}>
            <TextInput
              placeholder="Masukkan Link Gambar"
              value={image}
              onChangeText={(text) => setImage(text)}
              placeholderTextColor="#8a8a8a"
              borderWidth={0}
              underlineColorAndroid="transparent"
            />
          </View>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#3557e1" />
            </View>
          )}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => handleUpdate()}>
          <Text style={styles.buttonText}>Edit Penilaian</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingVertical: 15,
  },
  header: {
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#A9A9A9",
    paddingBottom: 10,
  },
  mainContent: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 30,
    fontFamily: fontType['Monday-Ramen'],
    marginTop: 20,
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
  imageInput:{
    paddingVertical: 20, 
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    paddingVertical: 26,
    borderWidth:1, 
    borderColor: "#000",
    alignItems: "center",
    minWidth: 170,
    height: 120,
    borderRadius: 8,
  },
  text: {
    marginTop: 8,
    textAlign: "center",
    color: "#000",
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#A9A9A9",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
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
});

export default EditPenilaian;
