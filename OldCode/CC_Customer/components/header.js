import Profile from './../assets/profile.svg';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.head}>
      <StatusBar backgroundColor="#5736B5" barStyle="light-content" />
      <Text style={styles.headTex}>{props.text}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Profile />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  head: {
    marginTop:16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  headTex: {
    fontSize: 20,
    fontWeight: 500,
    color: 'white',
  },
});
