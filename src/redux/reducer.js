import { LOGIN, ORDERS } from "./actionTypes";

  
  const initialState = {
      role: 0,
      address: '',
      orders: []
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state, role: action.payload, address: action.payload2
        };
        case ORDERS:
        return {
          ...state, orders: [].concat(action.payload)
        };
      default: return state;
    }
  };
  export default reducer;