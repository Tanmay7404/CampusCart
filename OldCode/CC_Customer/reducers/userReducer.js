export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ON_LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
