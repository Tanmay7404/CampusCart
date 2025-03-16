import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PhoneIcon from './../assets/Icons/PhoneIcon';
import RatingView from './RatingView';

const ShopCardInFocus = props => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View>
          <Text style={styles.head}>{props.name}</Text>
          <Text style={styles.shopDesc}>{props.dist} • {props.desc}</Text>
        </View>
        
        <RatingView rating={props.rating} />
      </View>
      <View />
      <View style={styles.openClose}>
        <Text style={styles.openBtn}>{props.isOpen}</Text>
        <Text style={styles.closesInText}>{'  Closes in 4 hours'}</Text>
      </View>
      <View style={styles.shopDetails}>
        <View style={styles.button}>
          <PhoneIcon style={styles.buttonText} />
          <Text style={styles.buttonText}>{props.contact}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: 600,
    fontSize: 12,
    color: '#5736B5'
  },
  shopDesc:{
    fontWeight: 300,
    fontSize: 14,
    color: '#6F6F6F'
  },
  button: {
    backgroundColor: '#EEEDFA',
    paddingHorizontal: 20,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'auto',
    borderRadius: 15,
    width: 130
  },
  shopDetails: {
    display: 'flex',
    flexDirection: 'row',
  },
  closesInText: {
    fontWeight: 400,
    fontSize: 12,
    color: '#6F6F6F',
  },
  openBtn: {
    borderRadius: 15,
    backgroundColor: '#55AE63',
    paddingHorizontal: 10,
    color: '#FFFFFF',
    fontWeight: 500,
    fontSize: 12,
    paddingVertical: 2,
  },
  openClose: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    fontWeight: 400,
    fontSize: 14,
    color: '#6F6F6F',
    marginTop: -4,
  },

  head: {
    fontWeight: 500,
    fontSize: 20,
    color:'black'
    // fontFamily:'General Sans'
  },
  heading: {
    // fontWeight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 30,
    marginHorizontal: 0,
    padding: 30,
    height: 170,
    width: '90%',
    backgroundColor: 'white',
  },
  parent: {},
});

export default ShopCardInFocus;
