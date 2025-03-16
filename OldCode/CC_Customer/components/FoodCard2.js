import React, {useState} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Heart from '../assets/smallHeart.svg';
import HeartActive from '../assets/smallHeartActive.svg';
import VegIcon from '../assets/veg.svg';
import NonVegIcon from '../assets/nonVeg.svg';
import {useDispatch, useSelector} from 'react-redux';
import {addtofav, removefromfav} from '../reducers/cartSlice';

const FoodCard = props => {
  const {fav} = useSelector(store => store.allCart);
  const dispatch = useDispatch();
  const [isFavourite, setIsFavourite] = useState(true);

  console.log(isFavourite);

  function handleClick() {
    setIsFavourite(newFavourite => !newFavourite);
    fav.forEach(item => {
      if (item.itemId === props.itemId && item.shopId === props.shopId) {
        item.isFavourite = !item.isFavourite;
      }
    });
  }
  // if (isFavourite) {
  //   dispatch(removefromfav(props));
  // }

  // const isFavourite = true;

  // const handleClick = () => {
  //   if (isFavourite) {
  //     dispatch(removefromfav({itemId: props.itemId, shopId: props.shopId}));
  //   }
  // };

  // if (!props.favVisible) {
  //   setIsFavourite(props.allFav);
  // }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.box1}>{props.heading1}</Text>
      </View>
      {props.favVisible ? (
        <View style={styles.circle}>
          <TouchableOpacity onPress={handleClick}>
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: isFavourite ? 'red' : 'white',
                borderRadius: 24,
              }}>
              {isFavourite ? (
                <HeartActive style={styles.heart} />
              ) : (
                <Heart style={styles.heart} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.veg}>
          {props.veg ? <VegIcon /> : <NonVegIcon />}
        </View>
      )}
      <Image source={props.image} style={styles.image} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 110,
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  textContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    width: '70%',
  },
  box1: {
    color: '#020314',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  veg: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  heart: {
    position: 'absolute',
    alignSelf: 'center',
    top: 7.5,
  },
  image: {
    position: 'absolute',
    borderRadius: 16,
    bottom: 2,
    right: 2,
    height: '50%',
    width: '50%',
  },
});

export default FoodCard;
