import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LocationCard from '../components/LocationCard';
import ShopCard from './../components/Shopcard';
import canteen from './../assets/canteen.png';
import Edit from './../assets/edit.svg';
import FoodCard2 from '../components/FoodCard2';
import Omelette from './../assets/omelette.png';
import Shake from '../assets/shake.png';
import Maggie from '../assets/maggi.png';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/Navbar';
import Header from '../components/header';
import SmallShopCard from '../components/smallShopCard';
import Recommended from './../components/recommended';
import bg from './../assets/recdummy.png';
import {useNavigation} from '@react-navigation/native';
import dummyShops from '../dummyShops';
import DummyUser from '../dummyData';
import {useSelector} from 'react-redux';

const Dash = ({}) => {
  const {fav} = useSelector(store => store.allCart);
  const {favShops} = useSelector(store => store.allCart);
  console.log(fav);
  const numItemsPerRow = favShops.length;
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePlaces, setIsVisiblePlaces] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = dummyShops.filter(
      shop =>
        shop.name.toLowerCase().includes(text.toLowerCase()) ||
        shop.menu.some(item =>
          item.itemName.toLowerCase().includes(text.toLowerCase()),
        ),
    );
    setFilteredResults(filtered);
  };
  console.log(searchQuery);
  console.log('hfla');
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.main}>
        <View style={styles.up}>
          <Header text="Order with ease" />
          <SearchBar
            textInput="Search here for restaurant"
            onhandleSearch={handleSearch}
            searchQuery={searchQuery}
          />
        </View>

        {/* <View style={styles.nearYou}>
          {searchQuery &&
            filteredResults.length > 0 &&
            filteredResults.map((shop, index) => {
              return (
                <TouchableOpacity
                  style={styles.box}
                  onPress={() => {
                    navigation.navigate('FoodShop', {id: shop.shopId});
                  }}>
                  <ShopCard
                    key={index}
                    rating={shop.rating}
                    img={shop.image}
                    dist=" "
                    line2={shop.description}
                    line1={shop.name}
                  />
                </TouchableOpacity>
              );
            })}
        </View> */}

        {!searchQuery && (
          <View style={styles.down}>
            <View style={styles.subHead}>
              <Text style={styles.subHeadTex}>Locations Across Campus</Text>
            </View>
            <View style={styles.choice}>
              <TouchableOpacity
                style={styles.wrapper2}
                onPress={() => {
                  navigation.navigate('Canteen');
                }}>
                <LocationCard text="Canteens" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wrapper2}
                onPress={() => {
                  navigation.navigate('Khoka');
                }}>
                <LocationCard text="Khoka" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wrapper2}
                onPress={() => {
                  navigation.navigate('MarketComplex');
                }}>
                <LocationCard text="Market Complex" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.wrapper2}
                onPress={() => {
                  navigation.navigate('FoodCourt');
                }}>
                <LocationCard text="Food Court" />
              </TouchableOpacity>
            </View>
            <View style={styles.subHead}>
              <Text style={styles.subHeadTex}>Your Favorites</Text>
              {!isVisible ? (
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                  <View style={styles.edit}>
                    <Edit />
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.options}>
                  <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                    <View style={styles.op1}>
                      <Text style={styles.editText1}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                    <View style={styles.op2}>
                      <Text style={styles.editText2}>Save</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.food}>
              <ScrollView horizontal={true}>
                {fav.map((item, index) => {
                  return (
                    <View style={styles.wrapper3}>
                      <FoodCard2
                        key={index}
                        heading1={item.itemName}
                        // image={item.itemImage}
                        // veg={item.isVeg}
                        favVisible={isVisible}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.subHead}>
              <Text style={styles.subHeadTex}>Places you love</Text>
              {!isVisiblePlaces ? (
                <TouchableOpacity
                  onPress={() => setIsVisiblePlaces(!isVisiblePlaces)}>
                  <View style={styles.edit}>
                    <Edit />
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.options}>
                  <TouchableOpacity
                    onPress={() => setIsVisiblePlaces(!isVisiblePlaces)}>
                    <View style={styles.op1}>
                      <Text style={styles.editText1}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsVisiblePlaces(!isVisiblePlaces)}>
                    <View style={styles.op2}>
                      <Text style={styles.editText2}>Save</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* <View style={styles.subHead}>
            <Text style={styles.subHeadTex}>Places You Love</Text>
            {!isVisiblePlaces ? (
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <View style={styles.edit}>
                  <Edit />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.options}>
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                  <View style={styles.op1}>
                    <Text style={styles.editText1}>Cancel</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                  <View style={styles.op2}>
                    <Text style={styles.editText2}>Save</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.edit}>
              <Edit />
            </View>
          </View> */}

            <View style={styles.placeYouLove}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{flexDirection: 'row'}}>
                {favShops.map((shop, index) => {
                  // console.log(shop.shopId);
                  // console.log('ghskgf');
                  return (
                    <TouchableOpacity
                      style={styles.box}
                      onPress={() => {
                        navigation.navigate('FoodShop', {id: shop.shopId});
                      }}>
                      <SmallShopCard
                        key={index}
                        rating={shop.rating}
                        img={canteen}
                        dist=""
                        line2={shop.line2}
                        line1={shop.line1}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={styles.subHead}>
              <Text style={styles.subHeadTex}>Recommended</Text>
            </View>
            <View style={styles.rec}>
              <View style={{width: '45%'}}>
                <Recommended
                  bg={bg}
                  rating="4.5"
                  name="Chicken Shawarma"
                  dest="Lohit Canteen"
                />
              </View>
              <View style={{width: '45%'}}>
                <Recommended
                  bg={bg}
                  rating="4.5"
                  name="Chicken Shawarma"
                  dest="Lohit Canteen"
                />
              </View>
              <View style={{width: '45%'}}>
                <Recommended
                  bg={bg}
                  rating="4.5"
                  name="Chicken Shawarma"
                  dest="Lohit Canteen"
                />
              </View>
              <View style={{width: '45%'}}>
                <Recommended
                  bg={bg}
                  rating="4.5"
                  name="Chicken Shawarma"
                  dest="Lohit Canteen"
                />
              </View>
            </View>

            <View style={styles.subHead}>
              <Text style={styles.subHeadTex}>Explore Food Outlets</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PlacesNearYou');
                }}>
                <Text style={styles.LinkText}>See all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.nearYou}>
              {dummyShops.map((shop, index) => {
                return (
                  <TouchableOpacity
                    style={styles.wrapper4}
                    onPress={() => {
                      navigation.navigate('FoodShop', {id: shop.shopId});
                    }}>
                    <ShopCard
                      key={index}
                      rating={shop.rating}
                      img={shop.image}
                      dist=" "
                      line2={shop.description}
                      line1={shop.name}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        <View style={styles.nearYou}>
          {searchQuery &&
            filteredResults.length > 0 &&
            filteredResults.map((shop, index) => {
              return (
                <TouchableOpacity
                  style={styles.wrapper4}
                  onPress={() => {
                    navigation.navigate('FoodShop', {id: shop.shopId});
                  }}>
                  <ShopCard
                    key={index}
                    rating={shop.rating}
                    img={shop.image}
                    dist=" "
                    line2={shop.description}
                    line1={shop.name}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
      <View
        style={{position: 'absolute', bottom: 0, width: '100%', height: 68}}>
        <NavBar active="Food" />
      </View>
    </View>
  );
};

export default Dash;

const styles = StyleSheet.create({
  up: {
    backgroungColor: '#5736B5',
    height: 150,
    width: '100%',
    zIndex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  down: {
    height: '100%',
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#EFEEFA',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 64,
  },
  main: {
    backgroundColor: '#5736B5',
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    width: '100%',
    height: '100%',
  },
  head: {
    marginTop: 48,
    marginLeft: 24,
    marginRight: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  edit: {
    paddingRight: 9,
  },
  options: {
    flexDirection: 'row',
  },
  op1: {
    width: 70,
    height: 28,
    borderRadius: 16,
    backgroundColor: '#EEEDFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D7D2E9',
  },
  op2: {
    width: 56,
    height: 28,
    borderRadius: 16,
    backgroundColor: '#5736B5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  editText1: {
    color: '#8A8297',
    fontSize: 14,
    fontWeight: 500,
  },
  editText2: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 500,
  },
  subHeadTex: {
    color: '#6F6F6F',
    fontSize: 14,
    fontWeight: 500,
  },
  headTex: {
    fontSize: 20,
    fontWeight: 500,
    color: 'white',
  },
  wrapper: {
    height: 204,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 16,
  },
  LinkText: {
    color: '#5736B5',
    fontSize: 14,
    fontWeight: 500,
  },
  subHead: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 16,
    marginTop: 16,
  },
  nearYou: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  choice: {
    width: '100%',
    height: 232,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    flexWrap: 'wrap',
  },
  wrapper2: {
    borderRadius: 16,
    width: '47.5%',
    marginBottom: 16,
  },
  food: {
    width: '100%',
    flexDirection: 'row',
  },
  wrapper3: {
    borderRadius: 16,
    height: 110,
    width: 110,
    marginRight: 16,
    margin: 16,
  },
  placeYouLove: {
    width: '100%',
    flexDirection: 'row',
  },
  box: {
    margin: 8,
    width: '50%',
  },
  wrapper5: {
    width: 236,
    height: 230,
    borderRadius: 16,
    marginRight: 16,
    margin: 16,
  },
  rec: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  wrapper6: {
    borderRadius: 16,
    width: '47.5%',
  },
  wrapper4: {
    width: '100%',
    marginBottom: 16,
  },
});
