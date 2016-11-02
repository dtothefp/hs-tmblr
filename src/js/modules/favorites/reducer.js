import omit from 'lodash/omit';
import {FAVORITES} from '../contstants';

const {ADD, REMOVE} = FAVORITES;

export default function(state = {}, action) {
  const {name, id, post, type} = action;
  const assign = next => Object.assign({}, state, next);
  let favs, newState, postData;

  switch (type) {
    case ADD:
      postData = Object.assign({}, post, {id});
      favs = state[name];

      newState = assign({
        [name]: Array.isArray(favs) ? [...favs, postData] : [postData]
      });
      break;
    case REMOVE:
      favs = state[name] || [];
      postData = favs.filter(({id: postId}) => id !== postId);

      if (postData.length) {
        newState = assign({
          [name]: postData
        });
      } else {
        newState = omit(state, name);
      }
      break;
  }

  return newState || state;
}
