/**
 * Take string with dollar sign appened and convert to number
 * @param {String} num
 * @return {Number}
 */
export default function(num) {
  return Number(num.replace(/[^0-9\.]+/g, ''));
}
