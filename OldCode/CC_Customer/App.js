import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

// screens
import GetStarted from './pages/GetStarted';
import SignUp from './pages/SignUp';
import SignUpOTP from './pages/SignUpOTP';
import Login from './pages/Login';
import SignUpPhone from './pages/signupPhone';
import StudentDashboard from './pages/studentDashboard';
import FoodDashboard from './pages/foodDashboard';
import PrintDashboard from './pages/printDashboard';
import FoodShopPage from './pages/FoodShopPage';
import StationaryPage from './pages/StationaryPage';
import BillingPage from './pages/BillingPage';
import YourOrders from './pages/YourOrders';
import Profile from './pages/Profile';
import PlacesNearYou from './pages/PlacesNearYou';
import Canteen from './pages/Canteen';
import FoodCourt from './pages/FoodCourt';
import MarketComplex from './pages/MarketComplex';
import Khoka from './pages/khoka';
import ColorPrint from './pages/ColorPrint';
import BwPrint from './pages/BwPrint';
import Lamination from './pages/Lamination';
import SpiralBinding from './pages/SpiralBinding';
import BannerPrint from './pages/BannerPrint';
import IdCard from './pages/IdCard';
import ExploreAll from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreStationary from './pages/ExploreStationary';
import SearchPlaces from './pages/SearchPlaces';
import SearchFood from './pages/SearchFood';
import SearchStationary from './pages/SearchStationary';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './store';
// icons

export default function App() {
  // const navigation = useNavigation()
  const Stack = createNativeStackNavigator();
  //Deep linking
  const LinkingOptions = {
    prefixes: ['campuscart://'], // Use the URL scheme you configured in Xcode
    config: {
      screens: {
        GetStarted: 'getstarted',
        Home: 'Home',
        Login: 'Login',
        Profile: 'Profile',
      },
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer linking={LinkingOptions}>
        <Stack.Navigator
          initialRouteName="GetStarted"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={StudentDashboard} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Food" component={FoodDashboard} />
          <Stack.Screen name="Print" component={PrintDashboard} />
          <Stack.Screen name="FoodShop" component={FoodShopPage} />
          <Stack.Screen name="StationaryPage" component={StationaryPage} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUpOTP" component={SignUpOTP} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUpPhone" component={SignUpPhone} />
          <Stack.Screen name="BillingPage" component={BillingPage} />
          <Stack.Screen name="Order" component={YourOrders} />
          <Stack.Screen name="PlacesNearYou" component={PlacesNearYou} />
          <Stack.Screen name="ColorPrint" component={ColorPrint} />
          <Stack.Screen name="BwPrint" component={BwPrint} />
          <Stack.Screen name="IdCard" component={IdCard} />
          <Stack.Screen name="Banner" component={BannerPrint} />
          <Stack.Screen name="SpiralBinding" component={SpiralBinding} />
          <Stack.Screen name="Lamination" component={Lamination} />
          <Stack.Screen name="Canteen" component={Canteen} />
          <Stack.Screen name="FoodCourt" component={FoodCourt} />
          <Stack.Screen name="MarketComplex" component={MarketComplex} />
          <Stack.Screen name="Khoka" component={Khoka} />
          <Stack.Screen name="Explore" component={ExploreAll} />
          <Stack.Screen name="ExploreFood" component={ExploreFood} />
          <Stack.Screen
            name="ExploreStationary"
            component={ExploreStationary}
          />
          <Stack.Screen name="SearchPlaces" component={SearchPlaces} />
          <Stack.Screen name="SearchFood" component={SearchFood} />
          <Stack.Screen name="SearchStationary" component={SearchStationary} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   navBar: {
//     flexDirection: 'row',
//     position: 'absolute',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     width: '100%',
//     height: 64,
//     bottom: 0,
//     zIndex: 10,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 12,
//     fontWeight: 500,
//     marginTop: 4,
//     color: '#999999',
//   },
//   activeText: {
//     fontSize: 12,
//     fontWeight: 500,
//     marginTop: 4,
//     color: '#5932E6',
//   },
// });
