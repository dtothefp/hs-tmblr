import {POSTS} from '../contstants';

const {
  INIT
} = POSTS;

export default function(state = {}, action) {
  switch (action.type) {
    case INIT:
      break;
  }

  return state;
}
