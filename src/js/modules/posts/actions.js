import {POSTS} from '../contstants';
import request from '../../services/api';

const {LOADING, SUCCESS, FAILURE} = POSTS;

export function init(opts = {}) {
  return dispatch => {
    dispatch({type: LOADING});

    return request(opts)
      .then(json => {
        const {response} = json;
        const data = response.posts || response; // for `tag` there are no `.posts`

        dispatch({
          type: data.length ? SUCCESS : FAILURE,
          data
        });

        return json;
      }).catch(err => {
        dispatch({type: FAILURE});
      });
  };
}
