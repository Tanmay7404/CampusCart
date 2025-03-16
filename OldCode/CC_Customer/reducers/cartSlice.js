import {createSlice} from '@reduxjs/toolkit';
const initialState = {cart: [], fav: [], favShops: []};
// console.log(initialState);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      const {itemId, shopId} = action.payload;
      console.log(itemId, shopId);
      console.log(state.cart);
      const item = state.cart.find(
        item => item.itemId === itemId && item.shopId === shopId,
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const {itemId, shopId} = action.payload;

      const item = state.cart.find(
        item => item.itemId === itemId && item.shopId === shopId,
      );
      if (item && item.quantity >= 1) {
        item.quantity -= 1;
      }
      state.cart = state.cart.filter(cart => cart.quantity !== 0);
    },
    addToCart(state, action) {
      const index = state.cart.findIndex(
        item =>
          item.itemId === action.payload.itemId &&
          item.shopId === action.payload.shopId,
      );
      console.log(index);
      if (index >= 0) state.cart[index].quantity += 1;
      else {
        const temp = {...action.payload};
        state.cart = [...state.cart, temp];
      }
    },
    addtofav: (state, action) => {
      const {itemId, shopId} = action.payload;
      const existingItemIndex = state.fav.findIndex(
        item => item.itemId === itemId && item.shopId === shopId,
      );
      if (existingItemIndex === -1) {
        state.fav.push(action.payload);
      }
    },
    removefromfav: (state, action) => {
      const {shopId, itemId} = action.payload;
      state.fav = state.fav.filter(
        item => item.shopId !== shopId || item.itemId !== itemId,
      );
    },
    updatefav(state, action) {
      state.fav = state.fav.filter(item => item.isFavourite);
    },
    addfavshop(state, action) {
      const index = state.favShops.findIndex(
        item => item.shopId === action.payload.shopId,
      );
      console.log(index);
      if (index >= 0) return;
      else {
        state.favShops.push(action.payload);
      }
      console.log('Function executed');
    },
    removefavshop(state, action) {
      const {shopId} = action.payload;
      state.favShops = state.favShops.filter(item => item.shopId !== shopId);
    },
  },
});
export const {
  increment,
  addToCart,
  decrement,
  addtofav,
  removefromfav,
  addfavshop,
  removefavshop,
  updatefav,
} = cartSlice.actions;
export default cartSlice.reducer;
