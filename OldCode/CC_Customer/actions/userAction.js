import {createAction} from '@reduxjs/toolkit';

export const onUserLoginAction = createAction(
  'user/login',
  function prepare({email, password}) {
    return {
      payload: {
        email,
        password,
      },
    };
  },
);

console.log(
  onUserLoginAction({email: 'something@gmail.com', password: '123456'}),
);
/**
 * {
 *   type: 'user/login',
 *   payload: {
 *     email: 'something@gmail.com',
 *     password: '123456'
 *   }
 * }
 **/
