import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

// icons
import NonVegIcon from '../assets/Icons/NonVegIcon';
import StarIcon from '../assets/Icons/StarIcon';
import VegIcon from '../assets/Icons/VegIcon';
import PlusIcon from '../assets/Icons/PlusIcon';
import MinusIcon from '../assets/Icons/MinusIcon';
// image

// component
import HorizontalDashedLine from './HorizontalDashedLine';
import FoodPopUp from './FoodPopUp';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, decrement, increment} from '../reducers/cartSlice';

const FoodCard = props => {
  const [vis, setVis] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [temporaryItem, setTemporaryItem] = useState();
  const {cart} = useSelector(store => store.allCart);

  const dispatch = useDispatch();
  const changeVisibility = () => {
    setVis(prev => !prev);
  };

  const getItemQuantityFromCart = (itemId, shopId) => {
    const cartItem = cart.find(
      item => item.itemId === itemId && item.shopId === shopId,
    );

    return cartItem ? cartItem.quantity : 0;
  };
  const itemQuantityInCart = getItemQuantityFromCart(
    props.itemId,
    props.shopId,
  );

  return (
    <View style={styles.foodCardMainContainer}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View>
            <View style={styles.headingDecorator}>
              {props.veg ? <VegIcon /> : <NonVegIcon />}
              {props.bestSeller ? (
                <Text style={styles.tag}>{'  Bestseller'}</Text>
              ) : null}
            </View>
            <Text style={styles.heading}>{props.heading}</Text>
            <Text style={styles.price}>₹{props.fullPrice}</Text>
          </View>
          <View style={styles.rating}>
            <Text style={styles.ratingValue}>{props.ratingValue + '  '}</Text>
            <StarIcon />
          </View>
        </View>

        <View style={styles.right}>
          <Image source={props.image} style={styles.image} />
          {itemQuantityInCart == 0 ? (
            <View style={styles.addBtnStyle}>
              <TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVis(!vis);
                    setTemporaryItem(props);
                  }}>
                  <Text style={styles.addText}>Add +</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.selectedBtnStyles}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(decrement(props));
                  }}
                  disabled={itemQuantityInCart == 0 ? true : false}>
                  <MinusIcon style={{marginRight: 10}} />
                </TouchableOpacity>
              </View>
              <Text style={{color: 'white', fontSize: 14}}>
                {itemQuantityInCart}
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(increment(props));
                  }}>
                  <PlusIcon style={{marginLeft: 10}} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
      <HorizontalDashedLine style={styles.line} />
      <Modal transparent={true} visible={vis}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#000000aa',
          }}>
          <TouchableOpacity
            style={{height: '100%', width: '100%'}}
            onPress={() => {
              setVis(!vis);
            }}
          />
          <View style={{bottom: 0, position: 'absolute', width: '100%'}}>
            <FoodPopUp
              changeVisibility={changeVisibility}
              itemId={props.itemId}
              shopId={props.shopId}
              image={props.image}
              veg={props.veg}
              bestSeller={props.bestSeller}
              halfFull={props.halfPrice ? 1 : 0}
              price1={props.halfPrice}
              price2={props.fullPrice}
              rating={props.ratingValue}
              itemName={props.heading}
              quantity={props.quantity}
              temporaryItem={temporaryItem}
              setVis={setVis}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    zIndex: 3, // works on ios
    elevation: 3, // works on android
  },
  price: {
    fontSize: 18,
    color: '#020314',
    fontWeight: 400,
  },
  tag: {
    color: '#5736B5',
    fontWeight: 500,
  },
  selectedBtnStyles: {
    backgroundColor: '#5736B5',
    borderRadius: 30,
    width: 78,
    paddingVertical: 7,
    marginTop: -10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnStyle: {
    width: 78,
    alignSelf: 'center',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
    // backgroundColor: "black",
  },
  left: {
    // backgroundColor: "black",
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  image: {
    marginRight: 0,
    borderRadius: 20,
    // marginLeft: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 500,
    color: '#020314',
  },
  addText: {
    fontWeight: 500,
    backgroundColor: '#EEEDFA',
    textAlign: 'center',
    borderRadius: 30,
    paddingVertical: 7,
    marginTop: -10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#5736B5',
    // alignItems: "center",
  },
  headingDecorator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  ratingValue: {
    color: 'white',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#55AE63',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: 'blue',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: 170,
    marginVertical: 0,
    backgroundColor: '#FFFFFF',
    // backgroundColor: "black",

    display: 'flex',
    flexDirection: 'row',
    padding: '6%',
    justifyContent: 'space-between',
  },
  foodCardMainContainer: {
    backgroundColor: '#FFFFFF',
    // marginTop: -1,
  },
});

export default FoodCard;
