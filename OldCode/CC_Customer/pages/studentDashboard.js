// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   FlatList,
//   TextInput,
//   StyleSheet,
// } from 'react-native';
// import FoodCard from './../components/FoodCard';
// import Pizza from './../assets/pizza.png';
// import Edit from './../assets/edit.svg';
// import FoodCard2 from '../components/FoodCard2';
// import Omelette from './../assets/omelette.png';
// import Shake from '../assets/shake.png';
// import Maggie from '../assets/maggi.png';
// import SearchBar from '../components/SearchBar';
// import NavBar from '../components/Navbar';
// import Header from '../components/header';
// import {useNavigation} from '@react-navigation/native';
// import ShopCard from '../components/Shopcard';
// import DummyShops from '../dummyShops';
// import DummyUser from '../dummyData';
// const Dash = () => {
//   const navigation = useNavigation();
//   const [isVisible, setIsVisible] = useState(false);
//   //   const [searchQuery, setSearchQuery] = useState('');
//   //   const [filteredResults, setFilteredResults] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredResults, setFilteredResults] = useState([]);

//   const handleSearch = text => {
//     setSearchQuery(text);
//     const filtered = DummyShops.filter(
//       shop =>
//         shop.name.toLowerCase().includes(text.toLowerCase()) ||
//         shop.menu.some(item =>
//           item.itemName.toLowerCase().includes(text.toLowerCase()),
//         ),
//     );
//     setFilteredResults(filtered);
//     // setModalVisible(true);
//   };
//   const closeModalAndSearch = text => {
//     setModalVisible(false);
//     handleSearch(text);
//   };
//   return (
//     <View style={styles.mainContainer}>
//       <ScrollView style={styles.main}>
//         <View style={styles.up}>
//           <Header text="Hey, Aarya" />

//           <SearchBar
//             textInput="Search here for restaurant, food, etc"
//             onhandleSearch={handleSearch}
//             value={searchQuery}
//             setModalVisible={setModalVisible}
//             modalVisible={modalVisible}
//             // closeModalAndSearch={closeModalAndSearch}
//           />
//         </View>

//         {/* Filtered Restaurant List */}

//         {/* Featured Categories */}
//         {
//           <View style={styles.down}>
//             {/* Your existing category cards */}
//             {/* ... */}
//             <View style={styles.choice}>
//               <TouchableOpacity
//                 style={styles.wrapper2}
//                 onPress={() => {
//                   navigation.navigate('Food');
//                 }}>
//                 <FoodCard
//                   heading1="Food"
//                   heading2="Order Food from across the campus"
//                   image={Pizza}
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.wrapper2}
//                 onPress={() => {
//                   navigation.navigate('Print');
//                 }}>
//                 <FoodCard
//                   heading1="Stationery"
//                   heading2="Get printouts and skip the line"
//                   image={Pizza}
//                 />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.subHead}>
//               <Text style={styles.subHeadTex}>Your Favorites</Text>
//               {!isVisible ? (
//                 <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
//                   <View style={styles.edit}>
//                     <Edit />
//                   </View>
//                 </TouchableOpacity>
//               ) : (
//                 <View style={styles.options}>
//                   <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
//                     <View style={styles.op1}>
//                       <Text style={styles.editText1}>Cancel</Text>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
//                     <View style={styles.op2}>
//                       <Text style={styles.editText2}>Save</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>
//             <View style={styles.food}>
//               <ScrollView horizontal={true}>
//                 {DummyUser[0].favItems.map((item, index) => {
//                   return (
//                     <View style={styles.wrapper3}>
//                       <FoodCard2
//                         key={index}
//                         heading1={item.itemName}
//                         image={item.itemImage}
//                         veg={item.isVeg}
//                         favVisible={isVisible}
//                       />
//                     </View>
//                   );
//                 })}
//               </ScrollView>
//             </View>

//             <View style={styles.subHead}>
//               <Text style={styles.subHeadTex}>Explore Places</Text>
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.navigate('Explore');
//                 }}>
//                 <Text style={styles.LinkText}>See all</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.nearYou}>
//               {DummyShops.map((shop, index) => {
//                 return (
//                   <TouchableOpacity
//                     style={styles.box}
//                     onPress={() => {
//                       navigation.navigate('FoodShop', {id: shop.shopId});
//                     }}>
//                     <ShopCard
//                       key={index}
//                       rating={shop.rating}
//                       img={shop.image}
//                       dist=" "
//                       line2={shop.description}
//                       line1={shop.name}
//                     />
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//             {/* Button to trigger Modal */}
//             {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
//               <Text>click here</Text>
//             </TouchableOpacity> */}
//           </View>
//         }

//         {/* Modal */}
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             setModalVisible(!modalVisible);
//           }}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <ScrollView>
//                 {searchQuery &&
//                   filteredResults.length > 0 &&
//                   filteredResults.map((shop, index) => (
//                     <TouchableOpacity
//                       key={index}
//                       style={styles.modalShop}
//                       onPress={() => {
//                         setModalVisible(false);
//                         navigation.navigate('FoodShop', {id: shop.shopId});
//                       }}>
//                       <ShopCard
//                         key={index}
//                         rating={shop.rating}
//                         img={shop.image}
//                         dist=" "
//                         line2={shop.description}
//                         line1={shop.name}
//                       />
//                       {/* Render shop details for modal */}
//                     </TouchableOpacity>
//                   ))}
//               </ScrollView>
//               {/* <TouchableOpacity onPress={() => }>
//                 <Text>Close Modal</Text>
//               </TouchableOpacity> */}
//             </View>
//           </View>
//         </Modal>
//       </ScrollView>
//       <View
//         style={{position: 'absolute', bottom: 0, width: '100%', height: 68}}>
//         <NavBar active="Home" />
//         {/* Your existing NavBar component */}
//       </View>
//     </View>
//   );
// };

// export default Dash;

// const styles = StyleSheet.create({
//   up: {
//     backgroungColor: '#5736B5',
//     height: 150,
//     width: '100%',
//     zIndex: 2,
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   shadow: {
//     marginBottom: 20,
//     borderRadius: 16,
//   },
//   box: {
//     margin: 8,
//     width: '100%',
//   },
//   down: {
//     height: '100%',
//     width: '100%',
//     borderRadius: 16,
//     backgroundColor: '#EFEEFA',
//     flexDirection: 'column',
//     alignItems: 'center',
//     paddingTop: 32,
//     marginBottom: 64,
//   },
//   main: {
//     backgroundColor: '#5736B5',
//     height: '100%',
//     width: '100%',
//   },
//   mainContainer: {
//     width: '100%',
//     height: '100%',
//   },
//   head: {
//     marginTop: 48,
//     marginLeft: 24,
//     marginRight: 24,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headTex: {
//     fontSize: 20,
//     fontWeight: 500,
//     color: 'white',
//   },
//   wrapper: {
//     height: 204,
//     width: '90%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     borderRadius: 16,
//   },
//   edit: {
//     paddingRight: 8,
//   },
//   options: {
//     flexDirection: 'row',
//   },
//   op1: {
//     width: 70,
//     height: 28,
//     borderRadius: 16,
//     backgroundColor: '#EEEDFA',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#D7D2E9',
//   },
//   op2: {
//     width: 56,
//     height: 28,
//     borderRadius: 16,
//     backgroundColor: '#5736B5',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 8,
//   },
//   editText1: {
//     color: '#8A8297',
//     fontSize: 14,
//     fontWeight: 500,
//   },
//   editText2: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: 500,
//   },
//   subHeadTex: {
//     color: '#6F6F6F',
//     fontSize: 14,
//     fontWeight: 500,
//   },
//   LinkText: {
//     color: '#5736B5',
//     fontSize: 14,
//     fontWeight: 500,
//     paddingRight: 8,
//   },
//   subHead: {
//     width: '100%',
//     height: 19,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     alignItems: 'center',
//     paddingLeft: 24,
//     paddingRight: 16,
//   },
//   nearYou: {
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   choice: {
//     width: '100%',
//     height: 184,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingLeft: 16,
//     paddingRight: 16,
//   },
//   wrapper2: {
//     borderRadius: 16,
//     height: 156,
//     width: '48%',
//     marginBottom: 32,
//   },
//   food: {
//     height: 114,
//     width: '100%',
//     marginBottom: 32,
//   },
//   wrapper3: {
//     borderRadius: 16,
//     height: 110,
//     width: 110,
//     marginRight: 16,
//     marginLeft: 16,
//   },
//   wrapper4: {
//     width: '100%',
//     marginBottom: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%', // Adjust width as needed
//     maxHeight: '80%', // Adjust height as needed
//   },
//   modalShop: {
//     marginBottom: 20,
//     // Additional styles for the shop card inside the modal
//   },
// });

import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FoodCard from './../components/FoodCard';
import Pizza from './../assets/pizza.png';
import Edit from './../assets/edit.svg';
import FoodCard2 from '../components/FoodCard2';
import Omelette from './../assets/omelette.png';
import Shake from '../assets/shake.png';
import Maggie from '../assets/maggi.png';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/Navbar';
import Header from '../components/header';
import {useNavigation} from '@react-navigation/native';
import ShopCard from '../components/Shopcard';
import DummyShops from '../dummyShops';
import DummyUser from '../dummyData';
import {useDispatch, useSelector} from 'react-redux';
import {removefromfav, updatefav} from '../reducers/cartSlice';

const Dash = () => {
  const navigation = useNavigation();
  const {fav} = useSelector(store => store.allCart);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = DummyShops.filter(
      shop =>
        shop.name.toLowerCase().includes(text.toLowerCase()) ||
        shop.menu.some(item =>
          item.itemName.toLowerCase().includes(text.toLowerCase()),
        ),
    );
    setFilteredResults(filtered);
  };
  const dispatch = useDispatch();
  function handleSave() {
    setIsVisible(!isVisible);
    fav.forEach(item => {
      dispatch(updatefav(item));
    });
  }
  function handleEdit() {
    setIsVisible(!isVisible);
  }
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.main}>
        <View style={styles.up}>
          <Header text="Hey, Aarya" />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchPlaces');
            }}
            style={{width: '100%'}}>
            <SearchBar
              textInput="Search here for restaurant, food, etc"
              onhandleSearch={handleSearch}
              value={searchQuery}
            />
          </TouchableOpacity>
        </View>

        {!searchQuery && (
          <View style={styles.down}>
            <View style={styles.choice}>
              <TouchableOpacity
                style={styles.wrapper2}
                onPress={() => {
                  navigation.navigate('Food');
                }}>
                <FoodCard
                  heading1="Food"
                  heading2="Order Food from across the campus"
                  image={Pizza}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.wrapper2}
                onPress={() => {
                  navigation.navigate('Print');
                }}>
                <FoodCard
                  heading1="Stationery"
                  heading2="Get printouts and skip the line"
                  image={Pizza}
                />
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
                  <TouchableOpacity onPress={handleEdit}>
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
            </View>
            <View style={styles.food}>
              <ScrollView horizontal={true}>
                {fav.map((item, index) => {
                  return (
                    <View style={styles.wrapper3}>
                      <FoodCard2
                        shopId={item.shopId}
                        itemId={item.itemId}
                        key={index}
                        heading1={item.itemName}
                        image={item.itemImage}
                        veg={item.isVeg}
                        favVisible={isVisible}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.subHead}>
              <Text style={styles.subHeadTex}>Explore Places</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Explore');
                }}>
                <Text style={styles.LinkText}>See all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.nearYou}>
              {DummyShops.map((shop, index) => {
                return (
                  <TouchableOpacity
                    style={styles.box}
                    onPress={() => {
                      navigation.navigate('FoodShop', {id: shop.shopId});
                    }}>
                    <ShopCard
                      shopId={shop.shopId}
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
      </ScrollView>
      <View
        style={{position: 'absolute', bottom: 0, width: '100%', height: 68}}>
        <NavBar active="Home" />
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
  shadow: {
    marginBottom: 20,
    borderRadius: 16,
  },
  box: {
    margin: 8,
    width: '100%',
  },
  down: {
    height: '100%',
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#EFEEFA',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 32,
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
  edit: {
    paddingRight: 8,
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
  LinkText: {
    color: '#5736B5',
    fontSize: 14,
    fontWeight: 500,
    paddingRight: 8,
  },
  subHead: {
    width: '100%',
    height: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 16,
  },
  nearYou: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
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
    width: '100%',
    marginBottom: 16,
  },
});
