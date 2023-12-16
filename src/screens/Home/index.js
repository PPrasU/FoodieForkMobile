import React, {useState, useRef} from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList, TouchableWithoutFeedback, TouchableOpacity, Animated } from 'react-native';
import { Profile, SearchNormal1 } from 'iconsax-react-native';
import { menuData, images, paketAYCE } from '../../../data';
import ImagesComponent from '../../components/images';
import {PaketAYCE, ProfileComp} from '../../components';
import { fontType } from '../../../theme';
import {useNavigation} from '@react-navigation/native';

const ListPaketAYCE = () => {
  const verticalData = paketAYCE.slice(0);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listMenu}>
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            <PaketAYCE item={item} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const HomeScreens = () => {
  const navigation = useNavigation();
  const [focusedItem, setFocusedItem] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const handleMenuItemPress = (itemId) => {
    setFocusedItem(itemId);
    setSelectedMenu(itemId);
  };
  const [isClaimPopupVisible, setIsClaimPopupVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [70, 10],
    extrapolate: 'clamp',
  });
  const flatListPosition = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -30],
    extrapolate: 'clamp',
  });
  const [dataPenilaian, setDataPenilaian] = useState([
    {
      id: 1,
      idPesanan: '#P12345AA',
      tanggalPesanan: '11-Juni-2023',
      hargaText: 'Rp.189.000',
      paketPromoText: 'Paket Promo A',
      imageMenu: 'https://i0.wp.com/rsud.tulungagung.go.id/wp-content/uploads/2022/02/news_20220212-5.jpeg?fit=875%2C480&ssl=1',
    },
    {
      id: 2,
      idPesanan: '#P12345AB',
      tanggalPesanan: '02-Juli-2023',
      hargaText: 'Rp.239.000',
      paketPromoText: 'Paket Promo B',
      imageMenu: 'https://cdn1-production-images-kly.akamaized.net/rIuSChJzTMJaDsP4qJYRYbyuix4=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2933903/original/079585200_1570542392-69841758_696593454196310_8793473457109982348_n.jpg',
    },
    {
      id: 3,
      idPesanan: '#P12345AC',
      tanggalPesanan: '02-Agustus-2023',
      hargaText: 'Rp.319.000',
      paketPromoText: 'Paket Promo C',
      imageMenu: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3D209FUa_7BmjyKp72Sm8blkWm8FeRXymyw&usqp=CAU',
    },
    {
      id: 4,
      idPesanan: '#P12345AD',
      tanggalPesanan: '02-September-2023',
      hargaText: 'Rp.399.000',
      paketPromoText: 'Paket Promo D',
      imageMenu: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaH6d5JbHbCK71wAtWMpB_ND-sCF26VoW8Pw&usqp=CAU',
    },
  ]);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const handleMenuItemPressNilaiPesanan = (itemId) => {
    const selectedItem = dataPenilaian.find((item) => item.id === itemId);
    setFocusedItem(itemId);
    setSelectedMenu(itemId);
    setSelectedItemData(selectedItem);
    navigation.navigate('Form', { dataPenilaian, selectedItemId: itemId });
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate ("Search") }>
          <View style={styles.searchBar}>
            <SearchNormal1 color="black" variant="Linear" style={styles.SearchNormal} />
            <Text style={styles.input}>Cari ... </Text>
          </View>
        </TouchableWithoutFeedback>
        <ProfileComp/>
      </Animated.View>

      <Animated.View style={{ marginTop: flatListPosition }}>
        <FlatList
          data={menuData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.menuItem,
                focusedItem === item.id && { backgroundColor: 'lightblue' },
              ]}
              onPress={() => handleMenuItemPress(item.id)}
            >
              <Text style={[styles.menuItemText, focusedItem === item.id && { color: 'blue' }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
      <ScrollView contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
        <ImagesComponent images={images} />
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Penilaian</Text>
        <View style={styles.ratingContent}>
          {dataPenilaian
            .filter(item => item.id === 2) 
            .map((item, index) => (
              <View style={styles.ratingInfo} key={index}>
                <Image
                  source={{uri: item.imageMenu}}
                  style={styles.ratingPic}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.idPesanan}>{item.idPesanan}</Text>
                  <Text style={styles.tanggalPesanan}>{item.tanggalPesanan}</Text>
                  <Text style={styles.hargaText}>{item.hargaText}</Text>
                </View>
              </View>
            ))}
          <Text style={styles.paketPromoText}>{dataPenilaian.find(item => item.id === 2)?.paketPromoText}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleMenuItemPressNilaiPesanan(2)}
          style={[
            styles.nilaiPesananButton,
            focusedItem === "nilaiPesanan" && { backgroundColor: "lightblue" },
          ]}
        >
          <Text
            style={[
              styles.menuItemText,
              focusedItem === "nilaiPesanan" && { color: "blue" },
            ]}
          >
            Nilai Pesanan
          </Text>
        </TouchableOpacity>

        </View>
        <View style={styles.specialOfferContainer}>
          <Text style={styles.specialOfferText}>Special Offer</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PromoScreens')}>
            <Text style={styles.viewAllText}>Lihat Semua </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.specialOfferPic}>
          <Image
            source={require('../../../assets/pictures/Diskon40.png')}
            style={styles.specialOfferImage}
          />
          <TouchableOpacity style={styles.claimButton} onPress={() => setIsClaimPopupVisible(true)}>
            <Text style={styles.claimButtonText}>Klaim</Text>
          </TouchableOpacity>
        </View>
        {/* {selectedMenu === '2' && <ListPaketAYCE />} */}
        <ListPaketAYCE />
      </ScrollView>
      {isClaimPopupVisible && (
        <View style={styles.claimPopup}>
          <Text style={styles.claimPopupText}>Selamat Kupon Berhasil Di Klaim</Text>
          <TouchableOpacity
            style={styles.closeClaimPopup}
            onPress={() => setIsClaimPopupVisible(false)}
          >
            <Text style={styles.closeClaimPopupText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "white"
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#eee',
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  SearchNormal: {
    marginLeft: 10,
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
  mainContent: {
    flexGrow: 1,
  },
  ratingContainer: {
    backgroundColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  ratingText: {
    fontFamily: fontType['Monday-Ramen'],
    fontSize: 22,
    color: 'black',
    marginLeft: 5,
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
    marginLeft: 155,
  },
  paketPromoText: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    marginLeft: -130,
  },
  nilaiPesananButton: {
    marginTop: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    minWidth: 100,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10, 
  },  
  specialOfferContainer: {
    backgroundColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  specialOfferText: {
    fontFamily: fontType['Monday-Rain'],
    fontSize: 22,
    color: 'black',
    marginLeft: 10,
  },
  viewAllText: {
    fontSize: 15,
    color: 'black',
    marginLeft: 140,
  },
  specialOfferPic: {
    backgroundColor: '#eee',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  specialOfferImage: {
    width: 375,
    height: 200,
    marginRight: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  claimButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#7a9860',
    padding: 10,
    borderRadius: 12,
  },
  claimButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#7a9860',
    padding: 5,
  },
  menuItem: {
    marginLeft: 20,
    marginTop: 15,
    marginRight: 17,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    minWidth: 100,
    height: 50,
  },
  menuItemText: {
    fontFamily: fontType['Monday-Ramen'],
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  },
  listMenu: {
    paddingVertical: 10,
    gap: 10,
  },
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  claimPopup: {
    position: 'absolute',
    top: '50%', 
    left: '60%',
    transform: [{ translateX: -190 }, { translateY: -100 }], 
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  claimPopupText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeClaimPopup: {
    marginTop: 20,
    backgroundColor: 'red', // Warna merah
    padding: 10,
    borderRadius: 10,
  },
  closeClaimPopupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});