import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './reducers/userReducer';
import cartSlice from './reducers/cartSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    allCart: cartSlice,
  },
});
