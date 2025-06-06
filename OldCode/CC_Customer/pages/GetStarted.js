import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {View, Text, TouchableOpacity, StyleSheet,StatusBar} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {getSession, renewSession} from '../api/auth';
import Logo from '../assets/logo.svg';

const GetStarted = () => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   try {
  //     const getUserSession = async () => {
  //       let data;
  //       const token = await AsyncStorage.getItem('accessToken');
  //       if (token) {
  //         try {
  //           data = await getSession(token);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //         if (data.success === true) {
  //           navigation.replace('Home');
  //         } else if (data.errorMessage === 'JWT_EXPIRED') {
  //           const Refreshtoken = await AsyncStorage.getItem('refreshToken');
  //           const {data} = await renewSession(Refreshtoken);
  //           await AsyncStorage.setItem('accessToken', data.access_token);
  //           getUserSession();
  //           // navigation.replace("Home");
  //         }
  //       } else {
  //         console.log('User not authenticated');
  //       }
  //     };
  //     getUserSession();
  //   } catch (err) {
  //     console.log('error here', err);
  //   }
  // }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#5736B5" barStyle="light-content" />
      <View style={styles.up}>
        <Logo/>
        <Text style={styles.Tex2}>
          Ordering on Campus made easier than ever
        </Text>
      </View>
      <View style={styles.down}>
        <TouchableOpacity
          style={styles.but}
          onPress={() => {
            // navigation.navigate('SignUp');
            navigation.navigate('Home');
          }}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.Tex}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#5736B5',
  },
  up: {
    width: '100%',
    height: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  down: {
    width: '100%',
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  but: {
    width: '90%',
    height: 38,
    borderRadius: 20,
    backgroundColor: '#EEEDFA',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#020314',
    fontSize: 16,
    fontWeight: 500,
  },
  Tex: {
    fontSize: 16,
    fontWeight: 500,
    color: 'white',
    width: '70%',
    textAlign: 'center',
    marginTop: 20,
  },
  Tex2: {
    fontSize: 20,
    fontWeight: 500,
    color: 'white',
    width: '70%',
    textAlign: 'center',
    marginTop: 36,
  },
});
