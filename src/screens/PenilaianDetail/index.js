import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ArrowLeft2, More} from 'iconsax-react-native';
import {fontType} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image';

const PenilaianDetail = ({route}) => {
  const navigation = useNavigation();
  const {penilaianId} = route.params;
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
    const subscriber = firestore()
      .collection('rating')
      .doc(penilaianId)
      .onSnapshot(documentSnapshot => {
        const ratingData = documentSnapshot.data();
        if (ratingData) {
          console.log('rating data: ', ratingData);
          setRatingData(ratingData);
        } else {
          console.log(`rating with ID ${penilaianId} not found.`);
        }
      });
    setLoading(false);
    return () => subscriber();
  }, [penilaianId]);
  const navigateEdit = () => {
    closeActionSheet();
    navigation.navigate('EditPenilaian', {penilaianId});
  };
  const handleDelete = async () => {
    setLoading(true);
    try {
      await firestore()
        .collection('rating')
        .doc(penilaianId)
        .delete()
        .then(() => {
          console.log('rating deleted!');
        });
      if (selectedrating?.image) {
        const imageRef = storage().refFromURL(selectedrating?.image);
        await imageRef.delete();
      }
      console.log('rating deleted!');
      closeActionSheet();
      setRatingData(null);
      setLoading(false);
      navigation.navigate('PenilaianScreens');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowLeftCircle}
          onPress={() => navigation.navigate('PenilaianScreens')}>
          <ArrowLeft2 color="black" variant="Linear" />
        </TouchableOpacity>
        <View>
          <Text style={styles.textDetail}>Detail Penilaian</Text>
        </View>
        <View style={styles.notifIcon}>
          <TouchableOpacity
            style={styles.notifCircle}
            onPress={openActionSheet}>
            <More size={30} color="black" variant="Linear" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <FastImage
          source={{uri: ratingData?.gambarPesanan}}
          style={styles.ratingPic}
        />
        <View style={styles.textContainer}>
          <Text style={styles.detailText}>{`ID Pesanan: ${ratingData?.idPesanan}`}</Text>
          <Text style={styles.detailText}>{`Tanggal Pesanan: ${ratingData?.tanggalPesanan}`}</Text>
          <Text style={styles.detailText}>{`Harga: ${ratingData?.hargaText}`}</Text>
          <Text style={styles.detailText}>{`Paket Promo: ${ratingData?.paketPromoText}`}</Text>
        </View>
      </View>
      <View style={styles.containerTitleRating}>
        <Text style={styles.titleRatingText}>Rasa</Text>
      </View>
      <View style={styles.containerDescription}>
        <Text style={styles.descriptionText}>{ratingData?.rasa}</Text>
      </View>
      <View style={styles.containerTitleRating}>
        <Text style={styles.titleRatingText}>Pelayanan</Text>
      </View>
      <View style={styles.containerDescription}>
        <Text style={styles.descriptionText}>{ratingData?.pelayanan}</Text>
      </View>
      <View style={styles.containerTitleRating}>
        <Text style={styles.titleRatingText}>Kepuasan</Text>
      </View>
      <View style={styles.containerDescription}>
        <Text style={styles.descriptionText}>{ratingData?.kepuasan}</Text>
      </View>
      <View style={styles.containerTitleRating}>
        <Text style={styles.titleRatingText}>Kenyamanan</Text>
      </View>
      <View style={styles.containerDescription}>
        <Text style={styles.descriptionText}>{ratingData?.kenyamanan}</Text>
      </View>
      <View style={styles.gambarRating}>
        <FastImage source={{uri: ratingData?.image}} style={styles.ratingPic} />
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
          onPress={navigateEdit}>
          <Text
            style={{
              color: '#000',
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
              color: '#000',
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
    backgroundColor: '#eee',
    borderRadius: 10,
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
  containerTitleRating: {
    borderBottomWidth: 0.2,
    borderTopWidth: 0.8,
    borderColor: "#000",
    marginHorizontal: 15,
  },
  containerDescription: {
    borderBottomWidth: 0.8,
    borderColor: "#000",
    marginHorizontal: 15,
    height: 50,
  },
  detailText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  gambarRating: {
    margin: 15,
  },
  titleRatingText: {
    fontSize: 22,
    fontFamily: fontType['Monday-Ramen'],
    paddingHorizontal: 8,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 18,
    paddingHorizontal: 8,
    marginTop: 10,
  },
});

export default PenilaianDetail;
