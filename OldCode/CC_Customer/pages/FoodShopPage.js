import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import chickenImage from './../assets/Img/Chicken.png';
import {useNavigation} from '@react-navigation/native';

// components
import FoodItemCard from '../components/FoodItemCard';
import ShopCardInFocus from '../components/ShopCardInFocus';
import ToggleSwitch from 'toggle-switch-react-native';
import SearchBar from '../components/SearchBar2';
import ShopHeader from '../components/ShopHeader';
import NavBar from '../components/Navbar';
import SmallPopUp from '../components/smallPopUp';
import shopDetails from '../dummyShops';

// icons
import UpArrowIcon from '../assets/Icons/UpArrowIcon';
import VegIcon from '../assets/Icons/VegIcon';
import {useDispatch, useSelector} from 'react-redux';
import {addfavshop, removefavshop} from '../reducers/cartSlice';

const FoodShopPage = ({route}) => {
  const [vis, setVis] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItemsVeg, setFilteredItemsVeg] = useState([]);
  const cart = useSelector(state => state.allCart.cart);
  const price = cart.map(item =>
    item.selectedPortion === 1
      ? item.quantity * item.halfPrice
      : item.quantity * item.fullPrice,
  );
  const quantity = cart.map(item => item.quantity);
  const totalquantity = quantity.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const totalamount = price.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  let shopI;
  let shopId = route.params.id;

  let itemList;
  shopDetails.forEach(shop => {
    if (shop.shopId === shopId) {
      shopI = shop;
      itemList = shop.menu;
    }
  });
  const handleSearch = text => {
    setSearchQuery(text);

    const filteredItems = itemList.filter(item =>
      item.itemName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredItems(filteredItems);
  };

  // const ctx = useContext(ShopContext);
  // useEffect(() => {
  //   const items = [];
  //   ctx.shop.forEach(element => {
  //     if (element._id === shopId) {
  //       setShopI(element);
  //       element.menu.forEach(item => {
  //         items.push(item);
  //       });
  //     }
  //   });
  //   setItemList(prev => [...items]);
  // }, [shopId]);

  let numAdded = 0;
  let totalPrice = 0;
  // console.log(ctx.itemList);
  // ctx.itemList.forEach(item => {
  //   numAdded = numAdded + item.quantity;
  //   totalPrice = totalPrice + item.totalPrice;
  // });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {favShops} = useSelector(store => store.allCart);
  const [veg, setVeg] = useState(false);
  const label = 'Veg';
  const [isFavourite, setIsFavourite] = useState(
    favShops.some(item => item.shopId === shopId),
  );

  const toggleFavourite = () => {
    setIsFavourite(isFavourite => !isFavourite);
    if (!isFavourite) {
      dispatch(addfavshop(shopI));
    } else {
      dispatch(removefavshop(shopI));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.main}>
        <StatusBar backgroundColor="#EFEEFA" barStyle="dark-content" />
        <View style={styles.UpperParent}>
          <ShopHeader isFavourite={isFavourite} onPress={toggleFavourite} />
          <ShopCardInFocus
            isOpen={shopI.isOpened ? 'OPEN' : 'CLOSE'}
            rating={shopI.rating}
            name={shopI.name}
            contact={shopI.contact}
            desc={shopI.description}
            dist={shopI.distance}
          />
          <View style={styles.searchArea}>
            <SearchBar
              textInput="Search for food items..."
              onhandleSearch={handleSearch}
              searchQuery={searchQuery}
            />
          </View>
          <View style={styles.toggleView}>
            <VegIcon />
            <ToggleSwitch
              isOn={veg}
              onColor="green"
              offColor="white"
              thumbOnStyle={{backgroundColor: '#EEEDFA'}}
              thumbOffStyle={{backgroundColor: '#EEEDFA'}}
              label={label}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="medium"
              onToggle={() => {
                setVeg(!veg);
              }}
            />
          </View>
        </View>
        <View style={styles.foodItemCardsContainerStyle}>
          <View style={styles.recommendedHeader}>
            <Text style={styles.recommendedTextStyle}>Recommended</Text>
            <UpArrowIcon />
          </View>
          <FlatList
            data={
              searchQuery
                ? filteredItems.filter(item => !veg || item.isVeg)
                : itemList.filter(item => !veg || item.isVeg)
            }
            keyExtractor={item => item.itemId.toString()}
            renderItem={({item}) => (
              <FoodItemCard
                shopId={shopId}
                itemId={item.itemId}
                key={item.itemId}
                heading={item.itemName}
                fullPrice={item.price}
                ratingValue={item.itemRating}
                veg={item.isVeg ? 1 : 0}
                bestSeller={1}
                image={chickenImage}
                halfPrice={item.hprice ? item.hprice : 0}
                quantity={item.quantity}
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.popUp}>
        <SmallPopUp text={totalquantity} price={totalamount} />
      </View>
      <NavBar active="Food" />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedTextStyle: {
    color: '#6F6F6F',
    fontSize: 16,
    fontWeight: 500,
  },
  recommendedHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: -30,
    zIndex: 1,
    padding: '6%',
  },
  UpperParent: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 29,
  },
  toggleView: {
    alignSelf: 'flex-end',
    paddingRight: '5%',
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchArea: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  foodItemCardsContainerStyle: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'white',
    marginTop: 10,
  },
  shopCardParent: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    backgroundColor: '#EFEEFA',
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    width: '100%',
    height: '100%',
  },

  // food card style
  line: {
    zIndex: 3, // works on ios
    elevation: 3, // works on android
  },
  price: {
    fontSize: 18,
  },
  tag: {
    color: '#5736B5',
    fontWeight: 500,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
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
  },
  addBtn: {
    fontWeight: 500,
    backgroundColor: '#EEEDFA',
    textAlign: 'center',
    borderRadius: 30,
    width: '80%',
    paddingVertical: 7,
    marginTop: -10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
  popUp: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 64,
  },
});

export default FoodShopPage;
