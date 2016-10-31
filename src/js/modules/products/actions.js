import {PRODUCTS} from '../contstants';
import request from '../../utils/ajax';

const {INIT_PRODUCTS} = PRODUCTS;

export function init() {
  return dispatch => {
    return request('products')
      .then(data => {
        dispatch({
          type: INIT_PRODUCTS,
          value: data
        });

        return data;
      });
  };
}
