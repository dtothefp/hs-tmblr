import throttle from 'lodash/throttle';
import request from '../utils/ajax';
import join from '../utils/join';
import {CART} from '../modules/contstants';

const {
  ADD_CART,
  REMOVE_CART,
  INCREMENT_CART,
  DECREMENT_CART
} = CART;
const methods = {
  [ADD_CART]: 'post',
  [INCREMENT_CART]: 'put',
  [DECREMENT_CART]: 'put',
  [REMOVE_CART]: 'delete'
};
const base = 'cart_order';

/**
 * Crud actions for updating cart
 * @param {String} type the action type
 * @param {String|Number} id
 * @param {Number} quantity
 * @return {Promise}
 */
function updateCart({type, id, quantity}) {
  const body = {id};
  const url = type === ADD_CART ? base : join(base, id);
  const method = methods[type];

  if (method !== 'post' && method !== 'delete') {
    Object.assign(body, {quantity});
  }

  return request(url, {method, body});
}

// TODO: don't think that throttle is working here
export default throttle(updateCart, 100);
