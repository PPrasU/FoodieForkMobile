import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TextInput, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Notification, SearchNormal, Home, TicketDiscount, ShoppingCart, Archive, User } from 'iconsax-react-native';
import { fontType } from './theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function App() {
  const images = [
    require('./assets/pictures/Promo1.jpg'),
    require('./assets/pictures/Promo2.jpg'),
    require('./assets/pictures/Promo3.jpg'),
    require('./assets/pictures/Promo4.jpg'),
    require('./assets/pictures/Promo5.jpg'),
  ];

  const menuData = [
    { id: '1', title: 'Paket Promo' },
    { id: '2', title: 'Paket AYCE' },
    { id: '3', title: 'Meat' },
    { id: '4', title: 'Side Dish' },
    { id: '5', title: 'Dessert' },
  ];

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
          <View style={styles.notifCircle}>
            <Notification size={30} color="black" variant="Linear" />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image
                source={item}
                style={styles.image}
              />
            </View>
          )}
          pagingEnabled={true}
        />
        <View style={styles.specialOfferContainer}>
          <Text style={styles.specialOfferText}>Special Offer</Text>
          <TouchableOpacity onPress={handleSeeAllPress}>
            <Text style={styles.viewAllText}>Lihat Semua </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.specialOfferPic}>
          <Image
            source={require('./assets/pictures/Diskon40.png')}
            style={styles.specialOfferImage}
          />
          <TouchableOpacity
            style={styles.claimButton}
            onPress={handleClaimPress}
          >
            <Text style={styles.claimButtonText}>Klaim</Text>
          </TouchableOpacity>
        </View>
        <FlatList
            data={menuData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuItemPress(item.id)}
              >
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
           <View style={styles.menuItemImages}>
            <Image source={require('./assets/pictures/Promo1.jpg')} style={styles.menuItemImage} />
            
            <Image source={require('./assets/pictures/Promo1.jpg')} style={styles.menuItemImage} />
          </View>
          <View style={styles.menuItemImages2}>
            <Image source={require('./assets/pictures/Promo1.jpg')} style={styles.menuItemImage} />
            <Image source={require('./assets/pictures/Promo1.jpg')} style={styles.menuItemImage} />
          </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerIcon}>
          <Home size={24} color="black" />
        </View>
        <View style={styles.footerIcon}>
          <TicketDiscount size={24} color="black" />
        </View>
        <View style={styles.shoppingCartIconContainer}>
          <View style={styles.shoppingCartIcon}>
            <ShoppingCart size={24} color="black" />
          </View>
        </View>
        <View style={styles.footerIcon}>
          <Archive size={24} color="black" />
        </View>
        <View style={styles.footerIcon}>
          <User size={24} color="black" />
        </View>
      </View>
    </View>
  );
}

const handleSeeAllPress = () => {
  console.log("Lihat Semua button pressed");
};

const handleClaimPress = () => {
  console.log("Klaim button pressed");
};

const handleMenuItemPress = (itemId) => {
  console.log(`Item menu dengan ID ${itemId} ditekan.`);
};

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
  imageContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  image: {
    marginLeft: 5,
    marginRight: 15,
    width: windowWidth - 30,
    height: windowHeight / 4.2,
    borderRadius: 30,
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
  footer: {
    backgroundColor: '#eee',
    padding: 20,
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerIcon: {
    alignItems: 'center',
  },
  shoppingCartIconContainer: {
    position: 'relative',
  },
  shoppingCartIcon: {
    position: 'center',
    top: -15,
    backgroundColor: 'orange',
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
