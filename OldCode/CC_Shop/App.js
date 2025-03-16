import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import Pending from './pages/PendingHomePage';
import Ready from './pages/ReadyHomePage';
import Insights7 from './pages/Last7Insights';
import Insights30 from './pages/Last30Insights';
import Profile from './pages/Profile';
import Completed from './pages/CompletedHomePage';
import Insights from './pages/TodayInsights';
import MenuPage from './pages/MenuPage';
import IncomingPopUp from './components/incomingPopUp';
import {SocketContextProvider} from './context/socketContext';
import AddItem from './pages/addItemPage';
import Category from './pages/chooseCategory';
import SubCategory from './pages/chooseSubCategory';
import {Provider} from 'react-redux';
import {store} from './store';

console.log('App component rendering...');

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <SocketContextProvider>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="GetStarted"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AddItem" component={AddItem}/>
          <Stack.Screen name="Pending" component={Pending} />
          <Stack.Screen name="Ready" component={Ready} />
          <Stack.Screen name="Category" component={Category}/>
          <Stack.Screen name="Subcategory" component={SubCategory}/>
          <Stack.Screen name="Completed" component={Completed} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Insights7" component={Insights7} />
          <Stack.Screen name="Insights30" component={Insights30} />
          <Stack.Screen name="Insights" component={Insights} />
          <Stack.Screen name="Menu" component={MenuPage} />
        </Stack.Navigator>
      </NavigationContainer>
    {/* </SocketContextProvider> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
