import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, } from 'react-native';
import { Notification, TicketDiscount,  } from 'iconsax-react-native';
import { fontType } from '../../../theme';
import { items } from './data';
import {useNavigation} from '@react-navigation/native';

const KeranjangScreens = () => {
  const navigation = useNavigation();
  const totalHarga = items.reduce((total, item) => total + parseFloat(item.price), 0);

  const formattedTotalHarga = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalHarga);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textKeranjang}>Keranjang</Text>
        <View style={styles.notifIcon}>
          <TouchableOpacity style={styles.notifCircle}>
            <Notification size={30} color="black" variant="Linear" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent}>
        {items.map((item, index) => (
          <View style={styles.box} key={index}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.boxTextTitle}>{item.title}</Text>
            <Text style={styles.boxSubText}>{item.subText}</Text>
            <Text style={styles.boxTextPrice}>Rp.{item.price}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.boxDiscount}>
          <TicketDiscount style={styles.iconDiscount}></TicketDiscount>
          <Text style={styles.textDiscount}>Masukkan Kupon....</Text>
        </TouchableOpacity>
        <View style={styles.totalHargaContainer}>
          <Text style={styles.totalHargaText}>Total Harga</Text>
          <View style={styles.hargaContainer}>
            <Text style={styles.hargaAmount}>{formattedTotalHarga}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.pesanButton}>
          <Text style={styles.pesanButtonText}>Pesan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default KeranjangScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'column',
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
  textKeranjang: {
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
  mainContent: {
    flexGrow: 1,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  boxTextTitle: {
    top: -20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  boxSubText: {
    left: -57,
  },  
  boxTextPrice: {
    marginHorizontal: "-5%",
    top: 22,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#eee',
    height: 170,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxDiscount: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 380,
    height: 40,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  iconDiscount: {
    color: "#9f9f9f",
    variant: "Linear",
    marginLeft: 10,
  },
  textDiscount: {
    marginLeft: 7,
    color: "#9f9f9f"
  },
  totalHargaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalHargaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    flex: 1,
    marginLeft: 20,
  },
  hargaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hargaAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',
    marginRight: 20,
  },
  pesanButton: {
    backgroundColor: 'orange',
    width: 380,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pesanButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
