/* eslint no-fallthrough:0 */
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import {CART} from '../contstants';

const {
  INIT_CART,
  TOGGLE_CART,
  ADD_CART,
  REMOVE_CART,
  INCREMENT_CART,
  DECREMENT_CART
} = CART;

export default function(state = {}, action) {
  const {id, total, quantity} = action;
  let nextState, items;

  switch (action.type) {
    case INIT_CART:
      const initalState = Object.assign({
        open: false,
        items: {}
      }, state);

      nextState = action.value.reduce((acc, {id, quantity = 1}) => {
        acc.items[id] = {quantity};

        return acc;
      }, initalState);
      break;
    case TOGGLE_CART:
      nextState = Object.assign({}, state, {
        open: isBoolean(action.open) ? action.open : !state.open
      });
      break;
    case ADD_CART:
    case REMOVE_CART:
    case INCREMENT_CART:
    case DECREMENT_CART:
      if (quantity === 0 && id) {
        items = omit(state.items, id);
        nextState = Object.assign({}, state, {items});
      } else if (isNumber(quantity)) {
        items = {
          [id]: {quantity}
        };
        nextState = merge({}, state, {items});
      }
      break;
  }

  if (isNumber(total)) {
    Object.assign(nextState, {total});
  }

  if (nextState && nextState.items) {
    const count = Object.keys(nextState.items).reduce((c, id) => {
      const {quantity: q} = nextState.items[id];

      return c + q;
    }, 0);

    Object.assign(nextState, {count});
  }

  return nextState || state;
}
