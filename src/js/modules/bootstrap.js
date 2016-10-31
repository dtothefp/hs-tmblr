/* eslint newline-per-chained-call:0 */
import {
  applyMiddleware,
  bindActionCreators,
  createStore,
  combineReducers,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {store as cart, actions as cartActions} from './cart';
import {store as products, actions as productActions} from './products';

export default function() {
  const {NODE_ENV} = process.env;
  const isDev = NODE_ENV === 'development';
  const middleware = [thunk];

  if (isDev) {
    middleware.push(createLogger());
  }

  // https://github.com/zalmoxisus/redux-devtools-extension
  // if (global.devToolsExtension) {
    // middleware.push(global.devToolsExtension());
  // }

  const reducer = combineReducers({cart, products});
  const middlewareWrapper = applyMiddleware(...middleware);
  const composed = compose(middlewareWrapper);
  const store = createStore(reducer, composed);
  const actions = {
    cartActions: bindActionCreators(cartActions, store.dispatch),
    productActions: bindActionCreators(productActions, store.dispatch)
  };

  return {
    store,
    actions
  };
}
