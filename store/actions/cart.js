export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = service => {
  return {type: ADD_TO_CART, service: service};
};

export const removeFromCart = serviceId => {
  return {type: REMOVE_FROM_CART, sid: serviceId};
};
