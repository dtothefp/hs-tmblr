import {FAVORITES} from '../contstants';

const {ADD, REMOVE} = FAVORITES;

export default function(state = [], action) {
  const {id, post, type} = action;
  let newState;

  switch (type) {
    case ADD:
      newState = [...state, post];
      break;
    case REMOVE:
      newState = state.filter(fav => id !== fav.id);
      break;
  }

  return newState || state;
}
