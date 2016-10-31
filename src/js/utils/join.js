import isString from 'lodash/isString';

const sanitize = str => {
  if (!isString(str)) str = `${str}`;
  const lastI = str.length - 1;

  return str.lastIndexOf('/') === lastI ? str.slice(0, lastI) : str;
};

/**
 * Naive path.join for the browser
 * @param {String} args individual string arguments to be joined
 * @return {String} joined path
 */
export default function(...args) {
  return args.map(sanitize).join('/');
}
