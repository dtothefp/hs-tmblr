import {FAVORITES} from '../contstants';

export function update(id, opts = {}) {
  const {method = 'add'} = opts;
  const type = FAVORITES[method.toUpperCase()];

  if (method === 'remove') {
    return {
      type,
      id
    };
  }

  return (dispatch, getState) => {
    const {posts, favorites} = getState();
    const hasId = favorites.filter(fav => fav.id === id).length;

    if (hasId) return;

    const [post] = posts.list.filter(post => id === post.id);

    dispatch({
      type,
      id,
      post
    });
  };
}
