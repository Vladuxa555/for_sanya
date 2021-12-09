import { LOGIN, ORDERS } from "./actionTypes";

  export function login(role,address) {
    return {
      type: LOGIN,
      payload: role,
      payload2: address,
    };
  }
  export function getOrders(orders) {
    return {
      type: ORDERS,
      payload: orders,
    };
  }