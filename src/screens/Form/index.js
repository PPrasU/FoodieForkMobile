import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { ArrowLeft, Star1, MagicStar, Camera, Video } from "iconsax-react-native";
import { fontType } from '../../../theme';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const Header = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
      <ArrowLeft size={24} color="#000"/>
    </TouchableOpacity>
  );
};

const RatingTextInput = ({ title, rating, setRating, placeholder }) => {
  const [isStarPressed, setIsStarPressed] = useState(false);
  return (
    <View style={RatingStyle.ratingSection}>
      <View style={RatingStyle.headerRating}>
        <Text style={RatingStyle.titleRating}>{title}</Text>
        <View style={RatingStyle.bintangRating}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity
              key={value}
              onPress={() => {
                setRating(value);
                setIsStarPressed(true);
              }}
            >
              <View style={RatingStyle.ratingItem}>
                {rating >= value ? (
                  <MagicStar size={25} variant="Bulk" style={RatingStyle.magicStar} />
                ) : (
                  <Star1 size={25} style={RatingStyle.star1} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {isStarPressed && (
        <View style={RatingStyle.textInput}>
          <TextInput
            style={RatingStyle.inputText}
            placeholder={placeholder}
            placeholderTextColor="#8a8a8a"
            borderWidth={0}
            underlineColorAndroid="transparent"
          />
        </View>
      )}
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
})

const MainContent = () => {
  const [ratingRasa, setRatingRasa] = useState(0);
  const [ratingPelayanan, setRatingPelayanan] = useState(0);
  const [ratingKepuasan, setRatingKepuasan] = useState(0);
  const [ratingKenyamanan, setRatingKenyamanan] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  return (
    <View style={styles.mainContent}>
      <Text style={styles.title}>Berikan Penilaian Anda</Text>
      <View style={styles.ratingContent}>
        <View style={styles.ratingInfo}>
          <Image
            source={require('../../../assets/pictures/MenuPaketA.png')}
            style={styles.ratingPic}
          />
          <View style={styles.textContainer}>
            <Text style={styles.idPesanan}>#P54844PP</Text>
            <Text style={styles.tanggalPesanan}>11-November-2023</Text>
            <Text style={styles.hargaText}>Rp.189.000</Text>
          </View>
        </View>
        <Text style={styles.paketPromoText}>Paket Promo A</Text>
      </View>
      <ScrollView>
        <RatingTextInput title="Rasa"
          rating={ratingRasa}
          setRating={setRatingRasa}
          placeholder="Deskripsikan rasa dari makanan tersebut ..."
        />
        <RatingTextInput title="Pelayanan"
          rating={ratingPelayanan}
          setRating={setRatingPelayanan}
          placeholder="Deskripsikan pelayanan yang Anda terima ..."
        />
        <RatingTextInput title="Kepuasan"
          rating={ratingKepuasan}
          setRating={setRatingKepuasan}
          placeholder="Deskripsikan kepuasan Anda ..."
        />
        <RatingTextInput title="Kenyamanan"
          rating={ratingKenyamanan}
          setRating={setRatingKenyamanan}
          placeholder="Deskripsikan kenyamanan tempat atau layanan ..."
        />
        <View style={styles.imageInput}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => setIsPressed(true)}
          >
            <Camera size="32" color="#000" variant="Broken"/>
            <Text style={styles.text}>Tambahkan Gambar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => setIsPressed(true)}
          >
            <Video size="32" color="#000" variant="Broken"/>
            <Text style={styles.text}>Tambahkan Gambar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const Footer = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Nilai</Text>
    </TouchableOpacity>
  );
};

const Form = () => {
  return (
    <View style={styles.container}>
      <Header />
      <MainContent />
      <Footer />
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

});

export default Form;
