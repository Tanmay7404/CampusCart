import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserScreen from './components/UserScreen';
import ShopkeeperScreen from './components/ShopkeeperScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/shopkeeper" element={<ShopkeeperScreen />} />
        <Route path="/" element={<UserScreen />} />
      </Routes>
    </Router>
  );
};

export default App;