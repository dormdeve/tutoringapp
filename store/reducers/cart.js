import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import CartItem from '../../models/cart-item';
import {ADD_ORDER} from '../actions/orders';
import {DELETE_SERVICE} from '../actions/services';

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedService = action.service;
      const servPrice = addedService.price;
      const servTitle = addedService.title;

      let updatedOrNewCartItem;

      if (state.items[addedService.id]) {
        /// already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedService.id].quantity + 1,
          servPrice,
          servTitle,
          state.items[addedService.id].sum + servPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, servPrice, servTitle, servPrice);
      }
      return {
        ...state,
        items: {...state.items, [addedService.id]: updatedOrNewCartItem},
        totalAmount: state.totalAmount + servPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.sid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.servicePrice,
          selectedCartItem.serviceTitle,
          selectedCartItem.sum - selectedCartItem.servicePrice
        );
        updatedCartItems = {...state.items, [action.sid]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.sid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.servicePrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_SERVICE:
      if (!state.items[action.sid]) {
        return state;
      }
      const updatedItems = {...state.items};
      const itemTotal = state.items[action.sid].sum;

      delete updatedItems[action.sid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }
  return state;
};
