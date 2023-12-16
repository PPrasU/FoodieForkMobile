import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback,} from 'react-native';
import {fontType} from '../../../theme';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Eye, EyeSlash} from 'iconsax-react-native';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoginDisabled, setLoginDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    let errorMessage = '';
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const userToken = await auth().currentUser.getIdToken();
      const expirationInMilliseconds = 30 * 24 * 60 * 60 * 1000; //hari * jam * menit * detik * milidetik
      const expirationTime = new Date().getTime() + expirationInMilliseconds;
      const dataToStore = {
        userToken,
        expirationTime,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(dataToStore));
      setLoading(false);
      navigation.navigate('MainApp');
    } catch (error) {
      setLoading(false);
      console.log('Login Error:', error.message);
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email tidak valid.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Password salah.';
      } else if (error.code === 'auth/invalid-login') {
        errorMessage = 'Email atau password salah, silahkan periksa kembali.';
      } else {
        errorMessage = 'Terjadi kesalahan saat login. Silahkan coba lagi';
      }
      Alert.alert('Error', errorMessage);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const updateLoginButtonStatus = () => {
    if (email.trim() && password.trim()) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  };
  useEffect(() => { updateLoginButtonStatus(); }, [email, password]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Image
            source={require('../../../assets/pictures/logo-black-removebg-preview.png')}
            style={styles.pic}/>
        </View>
        <View style={styles.containerFooter}>
          <Text style={styles.loginFooterText}>Masuk</Text>
          <TextInput style={styles.input}
            placeholder="Email"  value={email}
            onChangeText={text => {
              setEmail(text);
              updateLoginButtonStatus();
            }}
            inputMode="email"
            keyboardType="email-address"
          />
          <TextInput style={styles.input}
            placeholder="Password" value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={text => {
              setPassword(text);
              updateLoginButtonStatus();
            }}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={[{marginBottom: 150, left: 165, bottom: 20}]}>
            {passwordVisible ? (<Eye variant="Linear" color="#a3a3a3" size={20} />
            ) : (<EyeSlash variant="Linear" color="#a3a3a3" size={20} />)}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            disabled={isLoginDisabled}
            onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate('RegisterScreen')}>
            Belum punya akun? Daftar di sini.
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column',
  },
  containerHeader: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 3,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  pic: {
    marginTop: 10,
    width: 180,
    height: 180,
  },

  containerFooter: {
    flex: 6,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginFooterText: {
    fontFamily: fontType['Monday-Ramen'],
    fontSize: 36,
    top: 25,
    marginBottom: 20,
  },
  input: {
    top: 20,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  loginButton: {
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
  },
  loginButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
