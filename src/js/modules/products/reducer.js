import {PRODUCTS} from '../contstants';
import curr from '../../utils/currency-to-number';

const {INIT_PRODUCTS} = PRODUCTS;

export default function(state = {}, action) {
  const {value} = action;
  let newState;

  switch (action.type) {
    case INIT_PRODUCTS:
      newState = value.reduce((acc, {id, price, ...rest}) => {
        const product = Object.assign(rest, {
          price: curr(price)
        });

        acc[id] = product;
        return acc;
      }, {});
      break;
  }

  return Object.assign({}, state, newState);
}
