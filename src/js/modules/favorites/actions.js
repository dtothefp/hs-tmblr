import {FAVORITES} from '../contstants';

export function update(id, opts = {}) {
  const {method = 'add', name} = opts;
  const type = FAVORITES[method.toUpperCase()];

  return (dispatch, getState) => {
    const {posts} = getState();
    const post = posts.list[id];

    dispatch({
      type,
      name,
      id,
      post
    });
  };
}
