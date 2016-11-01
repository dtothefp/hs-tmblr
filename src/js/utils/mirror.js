export default function(name, actionTypes) {
  return actionTypes.reduce((acc, type) => ({
    ...acc,
    [type]: `${type}_${name}`
  }), {});
}
