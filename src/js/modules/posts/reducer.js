import {POSTS} from '../contstants';
import shapePosts from '../../utils/shape-posts-response';

const {
  LOADING,
  FAILURE,
  SUCCESS
} = POSTS;

export default function(state = {}, action) {
  const {data} = action;
  const assign = next => Object.assign({}, state, next);
  let newState;

  switch (action.type) {
    case LOADING:
      newState = assign({
        loading: true,
        failed: false
      });
      break;
    case SUCCESS:
      newState = assign({
        loading: false,
        failed: false,
        list: shapePosts(data)
      });
      break;
    case FAILURE:
      newState = assign({
        loading: false,
        failed: true,
        list: []
      });
      break;
  }

  return newState || state;
}
