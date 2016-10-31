/**
 * Total the products by their corresponding quantity
 * @param {Object} cart current state of cart
 * @param {Object} products current state of products
 * @param {Number} initial start total from here
 *
 * @return {Number} total
 */
export default function({cart, products}, initial = 0) {
  const {items = {}} = cart;

  return Object.keys(items).reduce((total, id) => {
    const {quantity} = items[id];
    const {price} = products[id];

    return total + (price * quantity);
  }, initial);
}
