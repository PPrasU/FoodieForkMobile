import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Notification, Home, TicketDiscount, ShoppingCart, Archive, User } from 'iconsax-react-native';
import { fontType } from '../../../theme';

const PromoScreens = () => {
    const [focusedIcon, setFocusedIcon] = useState('home');

    const handleIconPress = (iconName) => {
        setFocusedIcon(iconName);
    };

    const [isClaimPopupVisible, setIsClaimPopupVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textPromo}>Daftar Promo & Kupon</Text>
        <View style={styles.notifIcon}>
          <TouchableOpacity style={styles.notifCircle}>
            <Notification size={30} color="black" variant="Linear" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.specialOfferContainer}>
          <Text style={styles.specialOfferText}>Special Offer</Text>
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
        <View style={styles.anotherPromoContainer}>
            <View style={styles.anotherPromoText}>
                <Text style={styles.specialOfferText}>Promo Lainnya</Text>
            </View>
            <Image
                source={require('../../../assets/pictures/Diskon20.png')}
                style={styles.anotherPromoPic}
            />
            <TouchableOpacity style={styles.claimButton1} onPress={() => setIsClaimPopupVisible(true)}>
                <Text style={styles.claimButtonText}>Klaim</Text>
            </TouchableOpacity>
            <Image
                source={require('../../../assets/pictures/Diskon30.png')}
                style={styles.anotherPromoPic}
            />
            <TouchableOpacity style={styles.claimButton2} onPress={() => setIsClaimPopupVisible(true)}>
                <Text style={styles.claimButtonText}>Klaim</Text>
            </TouchableOpacity>
        </View>
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

export default PromoScreens;

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
  textPromo: {
    fontFamily: fontType['Sunday-Mango'],
    fontSize: 25,
    marginLeft: 18,
    color: "black",
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
    width: 370,
    height: 200,
    marginRight: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  claimButton: {
    position: 'absolute',
    bottom: 12,
    right: 20,
    backgroundColor: '#7a9860',
    padding: 10,
    borderRadius: 12,
  },
  claimButton1:{
    position: 'absolute',
    top: 200,
    right: 20,
    backgroundColor: '#7a9860',
    padding: 10,
    borderRadius: 12,
  },
  claimButton2:{
    position: 'absolute',
    top: 415,
    right: 20,
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
  anotherPromoContainer: {
    backgroundColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'column',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: 600,
  },
  anotherPromoPic: {
    marginTop: 15,
    width: 370,
    height: 200,
    marginRight: 10,
    borderRadius: 20,
  },
});