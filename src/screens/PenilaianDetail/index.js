import React, {useState, useRef, useEffect, } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ArrowLeft2, More } from 'iconsax-react-native';
import { fontType } from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

const PenilaianDetail = ({ route }) => {
  const navigation = useNavigation();
  const { penilaianId } = route.params;
  const [loading, setLoading] = useState(true);
  const [ratingData, setRatingData] = useState(null);
  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };
  
  useEffect(() => {
    getPenilaianId();
  }, [penilaianId]);

  const getPenilaianId = async () => {
    try {
      const response = await axios.get(
        `https://656475e2ceac41c0761e3a27.mockapi.io/ffmobileapp/rating/${penilaianId}`,
      );
      setRatingData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateEdit = () => {
    closeActionSheet()
    navigation.navigate('EditPenilaian', {penilaianId})
  };

  const handleDelete = async () => {
   await axios.delete(`https://656475e2ceac41c0761e3a27.mockapi.io/ffmobileapp/rating/${penilaianId}`)
      .then(() => {
        closeActionSheet()
        navigation.navigate('PenilaianScreens');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowLeftCircle} onPress={() => navigation.navigate('PenilaianScreens')}>
          <ArrowLeft2 color="black" variant="Linear" />
        </TouchableOpacity>
        <View>
          <Text style={styles.textDetail}>Detail Pesanan</Text>
        </View>
        <View style={styles.notifIcon}>
          <TouchableOpacity style={styles.notifCircle} onPress={openActionSheet}>
            <More size={30} color="black" variant="Linear" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <FastImage source={{ uri: ratingData?.gambarPesanan }} style={styles.ratingPic} />
        <View style={styles.textContainer}>
          <Text style={styles.detailText}>{`ID Pesanan: ${ratingData?.idPesanan}`}</Text>
          <Text style={styles.detailText}>{`Tanggal Pesanan: ${ratingData?.tanggalPesanan}`}</Text>
          <Text style={styles.detailText}>{`Harga: ${ratingData?.hargaText}`}</Text>
          <Text style={styles.detailText}>{`Paket Promo: ${ratingData?.paketPromoText}`}</Text>
        </View>
      </View>
      <View style={styles.textRating}>
        <Text style={styles.detailText}>{`Rasa: ${ratingData?.rasa}`}</Text>
        <Text style={styles.detailText}>{`Pelayanan: ${ratingData?.pelayanan}`}</Text>
        <Text style={styles.detailText}>{`Kepuasan: ${ratingData?.kepuasan}`}</Text>
        <Text style={styles.detailText}>{`Kenyamanan: ${ratingData?.kenyamanan}`}</Text>
      </View>
      <View style={styles.gambarRating}>
        <FastImage source={{ uri: ratingData?.image }} style={styles.ratingPic} />
      </View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}
          >
          <Text
            style={{
              color: "#000",
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              color: "#000",
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontType['Pjs-Medium'],
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#eee',
  },
  arrowLeftCircle: {
    marginLeft: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDetail: {
    fontFamily: fontType['Monday-Ramen'],
    fontSize: 35,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  notifIcon: {
    marginRight: 10,
  },
  notifCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    margin: 15,
    backgroundColor: "#eee",
    borderRadius : 10,
  },
  ratingPic: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    width: 120,
    height: 125,
  },
  textContainer: {
    bottom: 5,
    marginLeft: 10,
    alignItems: 'flex-start',
  },
  textRating: {
    marginHorizontal: 15,
    alignItems: 'flex-start',
  },
  detailText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  gambarRating:{
    margin: 10,
  },
});

export default PenilaianDetail;
