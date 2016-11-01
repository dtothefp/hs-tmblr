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
import {store as posts, actions as postActions} from './posts';
import {store as favorites, actions as favoriteActions} from './favorites';

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

  const reducer = combineReducers({posts, favorites});
  const middlewareWrapper = applyMiddleware(...middleware);
  const composed = compose(middlewareWrapper);
  const store = createStore(reducer, composed);
  const actions = {
    postActions: bindActionCreators(postActions, store.dispatch),
    favoriteActions: bindActionCreators(favoriteActions, store.dispatch)
  };

  return {
    store,
    actions
  };
}
