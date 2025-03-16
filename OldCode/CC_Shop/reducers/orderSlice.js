import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orders',
    
    initialState : {
        orders: [
            {
                id: 1,
                orderNumber: 1,
                createdAt: '2023/09/03 01:00:00',
                bill: 50, // Reduced the bill to match the single item
                status: 'completed',
                items: [
                  {
                    veg: 1,
                    num: 1,
                    item: 'Burger',
                    price: 50,
                  },
                ],
              },
              {
                id: 2,
                orderNumber: 2,
                createdAt: '2021/09/01 12:00:00',
                bill: 50, // Reduced the bill to match the single item
                status: 'pending',
                items: [
                  {
                    veg: 0,
                    num: 1,
                    item: 'Burger',
                    price: 50,
                  },
                ],
              },
              {
                id: 3,
                orderNumber: 3,
                createdAt: '2023/09/03 01:00:00',
                bill: 50, // Reduced the bill to match the single item
                status: 'ready',
                items: [
                  {
                    veg: 1,
                    num: 1,
                    item: 'Burger',
                    price: 50,
                  },
                ],
              },
              {
                id: 4,
                orderNumber: 4,
                createdAt: '2021/09/01 12:00:00',
                bill: 50, // Reduced the bill to match the single item
                status: 'incoming',
                items: [
                  {
                    veg: 1,
                    num: 1,
                    item: 'Burger',
                    price: 50,
                  },
                ],
              },
              {
                id: 5,
                orderNumber: 5,
                createdAt: '2021/09/01 12:00:00',
                bill: 50, // Reduced the bill to match the single item
                status: 'pending',
                items: [
                  {
                    veg: 1,
                    num: 1,
                    item: 'Burger',
                    price: 50,
                  },
                ],
              },
              {
                id: 6,
                orderNumber: 6,
                createdAt: '2021/09/01 12:00:00',
                bill: 50, // Reduced the bill to match the single item
                status: 'completed',
                items: [
                  {
                    veg: 1,
                    num: 1,
                    item: 'Burger',
                    price: 50,
                  },
                ],
              },
              {
                id: 7,
                orderNumber: 7,
                createdAt: '2021/09/01 12:00:00',
                bill: 50, // Reduced the bill to match the single item
                status: 'ready',
                items: [
                  {
                    veg: 1,
                    num: 1,
                    item: 'Burger',
                    price: 50,
                  },
                ],
              },
             
        ],
      },   
    reducers: {
      isReady: (state, action) => {
        const {orderId }= action.payload;
        // console.log(action.payload);
        const orderToChange = state.orders.find(order => order.id === orderId);
  
        if (orderToChange && orderToChange.status === 'pending') {
          orderToChange.status = 'ready';
        }
        // console.log('function executed')
      },

      isCompleted:(state,action)=>{
        const {orderId} = action.payload;
        const orderToChange = state.orders.find(order=>order.id === orderId);

        if (orderToChange && orderToChange.status === 'ready') {
            orderToChange.status = 'completed';
          }
      }
    },
  });
  

export const { isReady, isCompleted } = orderSlice.actions;
export default orderSlice.reducer;


