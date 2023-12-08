import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Like, ShoppingCart} from 'iconsax-react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation();

const DetailPesanan = ({item}) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigation = useNavigation();

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };
  return (
    <TouchableOpacity style={styles.cardItem} onPress={() => navigation.navigate('MenuPaketDetail', {blogId: item.id})}>
      <FastImage
        style={styles.cardImage}
        source={{ uri: item.image }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.cardContent}>
        <View
          style={{
            flexDirection: 'row',
            gap:30
          }}>
          <View style={{gap: 5, flex:1}}>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <TouchableOpacity onPress={handleLikePress}>
            <Like color="#454545" variant={isLiked ? 'Bold' : 'Linear'} size={26}/>
          </TouchableOpacity>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardText}>Rp.</Text>
          <Text style={styles.cardText}>{item.price}</Text>
          <TouchableOpacity style={{marginLeft: 140 }}>
            <ShoppingCart size={28} variant="Linear" color="#454545"/>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DetailPesanan;
const styles = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  cardItem: {
    backgroundColor: "#eee",
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardCategory: {
    color: "#0335fc",
    fontSize: 13,
  },
  cardTitle: {
    fontSize: 18,
    color: "#000",
  },
  cardText: {
    fontSize: 14,
    color: "#454545",
  },
  cardImage: {
    width: 94,
    height: 94,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});