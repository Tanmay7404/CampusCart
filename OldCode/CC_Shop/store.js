import {configureStore} from '@reduxjs/toolkit';

import orderSlice from './reducers/orderSlice';

console.log('Creating Redux store...');

export const store = configureStore({
  reducer: {
    orders : orderSlice,
  },
});

console.log('Redux store created:', store.getState());