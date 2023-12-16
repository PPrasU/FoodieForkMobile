import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight,
  TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView,
  Keyboard, TouchableWithoutFeedback, Image,} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Eye, EyeSlash} from 'iconsax-react-native';
import {fontType} from '../../../theme';
const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSignupDisabled, setSignupDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [paddingVertical, setPaddingVertical] = useState(60);
  const navigation = useNavigation();
  const handleRegister = async () => {
    let errorMessage = '';
    if (password !== confirmPassword) {
      errorMessage = 'Password dan konfirmasi password tidak cocok.';
    } else if (password.length < 8) {
      errorMessage = 'Panjang kata sandi harus minimal 8 karakter.';
    } else {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
      if (!passwordRegex.test(password)) {
        errorMessage = 'Password harus mengandung kombinasi huruf dan angka.';
      }
    }
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set({
          fullName,
          email,
          createdAt: new Date(),
        })
        .then(() => {
          console.log('User added!');
        });
      setLoading(false);
      navigation.navigate('LoginScreen');
    } catch (error) {
      setLoading(false);
      console.log('Registration Error:', error);
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email sudah terdaftar!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email tidak valid';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password lemah';
      }
      Alert.alert('Error', errorMessage);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const updateSignupButtonStatus = () => {
    if (
      fullName.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim()
    ) {
      setSignupDisabled(false);
    } else {
      setSignupDisabled(true);
    }
  };

  useEffect(() => {
    updateSignupButtonStatus();
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setPaddingVertical(0);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setPaddingVertical(60);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [fullName, email, password, confirmPassword]);
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container]}>
          <View style={styles.containerHeader}>
            <Image
              source={require('../../../assets/pictures/logo-black-removebg-preview.png')}
              style={styles.pic}
            />
          </View>
          <View style={styles.containerFooter}>
            <Text style={styles.loginFooterText}>Daftar</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan Nama Lengkap"
              value={fullName}
              onChangeText={text => {
                setFullName(text);
                updateSignupButtonStatus();
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                updateSignupButtonStatus();
              }}
              inputMode="email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={text => {
                setPassword(text);
                updateSignupButtonStatus();
              }}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={[{left: 165, top: 20}]}>
              {passwordVisible ? (
                <Eye variant="Linear" color="#a3a3a3" size={20} />
              ) : (
                <EyeSlash variant="Linear" color="#a3a3a3" size={20} />
              )}
            </TouchableOpacity>
            <TextInput
              style={[styles.input, {marginBottom: -30, top: 42}]}
              placeholder="Konfirmasi Password"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                updateSignupButtonStatus();
              }}
            />
            <TouchableOpacity
              onPress={toggleConfirmPasswordVisibility}
              style={[{marginBottom: 150, left: 165, top: 40}]}>
              {confirmPasswordVisible ? (
                <Eye variant="Linear" color="#a3a3a3" size={20} />
              ) : (
                <EyeSlash variant="Linear" color="#a3a3a3" size={20} />
              )}
            </TouchableOpacity>
            <TouchableHighlight
              style={[
                styles.loginButton,
                {
                  backgroundColor: isSignupDisabled ? '#eee' : '#fff',
                },
              ]}
              onPress={handleRegister}
              disabled={isSignupDisabled}>
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.loginButtonText}>Daftar</Text>
              )}
            </TouchableHighlight>
            <Text
              style={styles.registerText}
              onPress={() => navigation.navigate('LoginScreen')}>
              Sudah punya akun? masuk disini
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    width: 150,
    height: 150,
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
    top: 75,
    marginBottom: 20,
  },
  input: {
    top: 60,
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
    bottom: 40,
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
    bottom: 40,
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
