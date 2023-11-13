import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Notification, SearchNormal, Home, TicketDiscount, ShoppingCart, Archive, User } from 'iconsax-react-native';
import { menuData, images, paketAYCE } from '../../../data';
import ImagesComponent from '../../components/images';
import {PaketAYCE} from '../../components';
import { fontType } from '../../../theme';
import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation();

const ListPaketAYCE = () => {
  const verticalData = paketAYCE.slice(0);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>
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
  const [focusedItem, setFocusedItem] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const handleMenuItemPress = (itemId) => {
    setFocusedItem(itemId);
    setSelectedMenu(itemId);
  };
  const [isClaimPopupVisible, setIsClaimPopupVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <SearchNormal color="black" variant="Linear" style={styles.SearchNormal} />
          <TextInput
            placeholder="Cari...."
            placeholderTextColor="black"
            style={styles.input}
          />
        </View>
        <View style={styles.notifIcon}>
          <TouchableOpacity style={styles.notifCircle}>
            <Notification size={30} color="black" variant="Linear" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        <ImagesComponent images={images} />
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
        {/* implementasi state */}
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
              <Text style={[styles.menuItemText, focusedItem === item.id && { color: 'blue' }]}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
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

      {/* <View style={styles.footer}>
        <View style={styles.footerIcon}>
          <TouchableOpacity onPress={() => handleIconPress('home')}>
            <Home size={24} color={focusedIcon === 'home' ? 'blue' : 'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.footerIcon}>
          <TouchableOpacity onPress={() => handleIconPress('ticketDiscount')}>
            <TicketDiscount size={24} color={focusedIcon === 'ticketDiscount' ? 'blue' : 'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.shoppingCartIconContainer}>
          <TouchableOpacity onPress={() => handleIconPress('shoppingCart')}>
            <View style={styles.shoppingCartIcon}>
              <ShoppingCart size={24} color={focusedIcon === 'shoppingCart' ? 'blue' : 'black'} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footerIcon}>
          <TouchableOpacity onPress={() => handleIconPress('archive')}>
            <Archive size={24} color={focusedIcon === 'archive' ? 'blue' : 'black'} />
          </TouchableOpacity>
        </View>
        <View style={styles.footerIcon}>
          <TouchableOpacity onPress={() => handleIconPress('user')}>
            <User size={24} color={focusedIcon === 'user' ? 'blue' : 'black'} />
          </TouchableOpacity>
        </View>
      </View> */}
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
    height: 40,
  },
  menuItemText: {
    fontFamily: fontType['Monday-Ramen'],
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  menuItemImages: {
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
    backgroundColor: "#eee",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemImages2: {
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
    backgroundColor: "#eee",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemImage: {
    width: 165,
    height: 165,
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