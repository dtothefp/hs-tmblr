import {POSTS} from '../contstants';
import request from '../../services/api';

const {LOADING, SUCCESS, FAILURE} = POSTS;

export function init(opts = {}) {
  return dispatch => {
    dispatch({type: LOADING});

    return request(opts)
      .then(data => {
        dispatch({
          type: SUCCESS,
          value: data
        });

        return data;
      }).catch(err => {
        dispatch({type: FAILURE});
      });
  };
}
