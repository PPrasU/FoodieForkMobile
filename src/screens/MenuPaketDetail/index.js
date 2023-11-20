import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ArrowLeft, Like1, Receipt21, Message, Share, More, ShoppingCart} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {paketAYCE} from '../../../data';
import FastImage from 'react-native-fast-image';

const MenuPaketAYCE = ({route}) => {
  const {blogId} = route.params;
  const [iconStates, setIconStates] = useState({
    bookmarked: {variant: 'Linear', color: "#454545"},
  });
  const selectedBlog = paketAYCE.find(blog => blog.id === blogId);
  const navigation = useNavigation();
  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? "#0335fc"
            : "#454545",
      },
    }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft
            color="#454545"
            variant="Linear"
            size={24}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 62,
          paddingBottom: 54,
        }}>
        <FastImage
          style={styles.image}
          source={selectedBlog.image}
          resizeMode={FastImage.resizeMode.cover}>
        </FastImage>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Text style={styles.category}>{selectedBlog.category}</Text>
          <Text style={styles.price}>Rp.{selectedBlog.price}</Text>
        </View>
        <Text style={styles.title}>{selectedBlog.title}</Text>
        <Text style={styles.content}>{selectedBlog.content}</Text>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
          <Receipt21
            color={iconStates.bookmarked.color}
            variant={iconStates.bookmarked.variant}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ShoppingCart
            color={iconStates.bookmarked.color}
            variant={iconStates.bookmarked.variant}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MenuPaketAYCE;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: "#fff",
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 60,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    width: 'auto',
    borderRadius: 15,
  },
  info: {
    color: "#454545",
    fontSize: 12,
  },
  category: {
    color: "#0335fc",
    fontSize: 12,
  },
  price: {
    color: "#454545",
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
  content: {
    color: "#454545",
    fontSize: 10,
    lineHeight: 20,
    marginTop: 15,
  },
});