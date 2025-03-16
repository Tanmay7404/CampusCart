import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ShopCard from '../components/Shopcard';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/Navbar';
import Header from '../components/header';
import {useNavigation} from '@react-navigation/native';
import userDetails from '../dummyData';
import shopDetails from '../dummyShops';

const MarketComplex = () => {
  const navigation = useNavigation();
  const headerText = `Hey, ${userDetails[0].userName}`;
  // const ctx = useContext(ShopContext);

  // let cards = [];

  // const fetchData = async () => {
  //   cards = ctx.shop
  //     .filter(item => item.category == 3)
  //     .map(item => (
  //       <TouchableOpacity
  //         key={item._id}
  //         style={styles.wrapper4}
  //         onPress={() => {
  //           navigation.navigate('FoodShop', {id: item._id});
  //         }}>
  //         <ShopCard
  //           img={canteen}
  //           line1={item.name}
  //           line2="Snacks & cuisines"
  //           rating={item.rating}
  //         />
  //       </TouchableOpacity>
  //     ));
  // };
  // fetchData();
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.main}>
        <View style={styles.up}>
          <Header text={headerText} />
          <SearchBar textInput="Search here for restaurant, food, etc" />
        </View>
        <View style={styles.down}>
          <View style={styles.subHead}>
            <Text style={styles.subHeadTex}>
              Food outlets at Market Complex
            </Text>
          </View>
          {/* <View style={styles.nearYou}></View> */}
          {shopDetails.map((shop) => {
            if(shop.category === 'marketComplex'){
            return (
              <TouchableOpacity style={styles.wrapper4} onPress={()=>{navigation.navigate("FoodShop");}}>
                <ShopCard img={shop.image} line1={shop.name} dist="200m" line2={shop.description} rating={shop.rating}/>
              </TouchableOpacity>
            )}
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

export default MarketComplex;

const styles = StyleSheet.create({
  up: {
    backgroungColor: '#5736B5',
    height: 150,
    width: '100%',
    zIndex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  shadow: {
    marginBottom: 20,
    borderRadius: 16,
  },
  down: {
    height: '100%',
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#EFEEFA',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 24,
    marginBottom: 64,
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
  subHeadTex: {
    color: '#6F6F6F',
    fontSize: 14,
    fontWeight: 500,
  },
  LinkText: {
    color: '#5736B5',
    fontSize: 14,
    fontWeight: 500,
  },
  subHead: {
    width: '90%',
    height: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  nearYou: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  choice: {
    width: '100%',
    height: 184,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  wrapper2: {
    borderRadius: 16,
    height: 156,
    width: '48%',
    marginBottom: 32,
    borderRadius: 16,
  },
  food: {
    height: 114,
    width: '100%',
    marginBottom: 32,
  },
  wrapper3: {
    borderRadius: 16,
    height: 110,
    width: 110,
    marginRight: 16,
    marginLeft: 16,
  },
  wrapper4: {
    width: '92%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
});
