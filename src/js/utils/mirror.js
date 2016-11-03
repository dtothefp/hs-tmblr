/**
 * Make a unique key mirror by prepending a name to action types
 * @param {String} name
 * @param {Array} actionTypes
 * @return {Object} key-mirror
 * ex.
 * {
 *   INIT: 'INIT_POSTS'
 * }
 */
export default function(name, actionTypes) {
  return actionTypes.reduce((acc, type) => ({
    ...acc,
    [type]: `${type}_${name}`
  }), {});
}
