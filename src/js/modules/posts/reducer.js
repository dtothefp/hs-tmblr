import {POSTS} from '../contstants';
import shapePosts from '../../utils/shape-posts-response';

const {
  LOADING,
  SUCCESS
} = POSTS;

export default function(state = {}, action) {
  const {data} = action;
  const assign = next => Object.assign({}, state, next);
  let newState;

  switch (action.type) {
    case LOADING:
      newState = assign({loading: true});
      break;
    case SUCCESS:
      newState = assign({
        loading: false,
        list: shapePosts(data)
      });
      break;
  }

  return newState || state;
}
