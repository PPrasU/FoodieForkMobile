import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fontType} from '../../../theme';
const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => { cekToken(); }, []);
  const cekToken = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        const {userToken, expirationTime} = userData;

        if (userToken && expirationTime) {
          const currentTime = new Date().getTime();

          if (currentTime <= expirationTime) {
            setTimeout(() => {
              navigation.replace('MainApp');
            }, 1500);
          } else {
            setTimeout(() => {
              navigation.replace('LoginScreen');
            }, 1500);
          }
        } else {
          setTimeout(() => {
            navigation.replace('LoginScreen');
          }, 1500);
        }
      } else {
        setTimeout(() => {
          navigation.replace('LoginScreen');
        }, 1500);
      }
    } catch (error) {
      console.error('Error retrieving token data:', error);
      setTimeout(() => {
        navigation.replace('LoginScreen');
      }, 1500);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/pictures/logo-black-removebg-preview.png')}
        style={styles.pic}
      />
      <Text style={styles.text}>Foodiefork Mobile</Text>
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic:{
    height: 120,
    width: 120,
  },
  text: {
    fontSize: 36,
    color: '#aec6b9',
    fontFamily:fontType['Monday-Ramen']
  },
});
