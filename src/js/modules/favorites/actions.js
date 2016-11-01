import {FAVORITES} from '../contstants';

export function update(id, {method = 'add'}) {
  const type = FAVORITES[method.toUpperCase()];

  return {
    type,
    id
  };
}
