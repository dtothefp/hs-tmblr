import request from '../../utils/ajax';
import getTotal from '../../utils/get-total';
import {CART} from '../contstants';
import updateCart from '../../services/update-cart';

const {
  INIT_CART,
  TOGGLE_CART,
  ADD_CART,
  REMOVE_CART,
  INCREMENT_CART,
  DECREMENT_CART
} = CART;

export function init() {
  return dispatch => {
    return request('cart_order')
      .then(data => {
        dispatch({
          type: INIT_CART,
          value: data
        });

        return data;
      });
  };
}

export function toggleCart(opts = {}) {
  const {open} = opts;

  return {
    type: TOGGLE_CART,
    open
  };
}

export function update(id, opts = {}) {
  return (dispatch, getState) => {
    const {method = 'add'} = opts;
    const state = getState();
    const {products, cart} = state;
    const {price} = products[id];
    let {quantity = 0} = cart.items && cart.items[id] || {};
    let type, subTotal;

    switch (method) {
      case 'add':
        type = ADD_CART;
        subTotal = price;
        quantity = 1;
        break;
      case 'remove':
        type = REMOVE_CART;
        subTotal = -(price * quantity);
        quantity = 0;
        break;
      case 'increment':
        type = INCREMENT_CART;
        subTotal = price;
        quantity += 1;
        break;
      case 'decrement':
        type = DECREMENT_CART;
        subTotal = -price;
        quantity -= 1;
        break;
    }

    const action = {
      type: quantity === 0 ? REMOVE_CART : type,
      id,
      total: getTotal(state, subTotal),
      quantity
    };

    dispatch(action);

    if (!global.describe) {
      updateCart(action).catch(err => {
        // TODO: handle error i.e. `dispatch(/* some error action */)
        console.error(err.message, err.stack); // eslint-disable-line
      });
    }
  };
}
