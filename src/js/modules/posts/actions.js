import {POSTS} from '../contstants';
import request from '../../services/api';

const {LOADING, SUCCESS, FAILURE} = POSTS;

export function init(opts = {}) {
  return dispatch => {
    dispatch({type: LOADING});

    return request(opts)
      .then(data => {
        const {response} = data;

        dispatch({
          type: SUCCESS,
          data: response.posts || response // for `tag` there are no `.posts`
        });

        return data;
      }).catch(err => {
        dispatch({type: FAILURE});
      });
  };
}
