import React, {useState, useCallback, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, RefreshControl, Image,} from 'react-native';
import {Notification} from 'iconsax-react-native';
import {fontType} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const RatingBox = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() =>
        navigation.navigate('PenilaianDetail', {penilaianId: item.id})
      }>
      <View style={styles.ratingInfo}>
        <Image source={{uri: item.gambarPesanan}} style={styles.ratingPic} />
        <View style={styles.textContainer}>
          <Text style={styles.idPesanan}>{item.idPesanan}</Text>
          <Text style={styles.tanggalPesanan}>{item.tanggalPesanan}</Text>
          <Text style={styles.hargaText}>{item.hargaText}</Text>
        </View>
      </View>
      <Text style={styles.paketPromoText}>{item.paketPromoText}</Text>
    </TouchableOpacity>
  );
};

const PenilaianScreens = () => {
  const [loading, setLoading] = useState(true);
  const [ratingData, setRatingData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('rating')
      .onSnapshot(querySnapshot => {
        const ratings = [];
        querySnapshot.forEach(documentSnapshot => {
          ratings.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setRatingData(ratings);
        setLoading(false);
      });
    return () => subscriber();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('rating')
        .onSnapshot(querySnapshot => {
          const ratings = [];
          querySnapshot.forEach(documentSnapshot => {
            ratings.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setRatingData(ratings);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.textPenilaian}>Penilaian</Text>
        </View>
        <View style={styles.notifIcon}>
          <TouchableOpacity style={styles.notifCircle}>
            <Notification size={30} color="black" variant="Linear" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <ActivityIndicator size="large" color="#3557e1" />
        ) : (
          ratingData.map((item, index) => <RatingBox key={index} item={item} />)
        )}
      </ScrollView>
    </View>
  );
};

export default PenilaianScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#eee',
  },
  textPenilaian: {
    marginLeft: 120,
    fontFamily: fontType['Monday-Ramen'],
    fontSize: 35,
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
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#f7f7f7',
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
    marginTop: 40,
    marginLeft: 160,
  },
  paketPromoText: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    left: -95,
  },
});
