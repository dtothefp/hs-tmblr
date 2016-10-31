import {expect} from 'chai';
import fetchMock from 'fetch-mock';
import curr from '../../../src/js/utils/currency-to-number';
import {products} from '../../../data/db';
import flux from '../../../src/js/modules/bootstrap';

const id = 1;
const mockCart = [{id}];
const prices = products.reduce((acc, {id, price}) => ({
  ...acc,
  [id]: curr(price)
}), {});

fetchMock.get('http://localhost:3000/products', products);
fetchMock.get('http://localhost:3000/cart_order', mockCart);

describe('cart-flux-module', () => {
  const id = 2;
  const {store, actions} = flux();
  const getState = () => store.getState().cart;
  const getTotal = () => getState().total;
  const getItemState = id => getState().items[id];

  before(async () => {
    await Promise.all([
      actions.productActions.init(),
      actions.cartActions.init()
    ]);
  });

  it('should initialize cart items from the api', () => {
    const state = getState();
    const expected = {
      '1': {
        quantity: 1
      }
    };

    expect(state.items).to.eql(expected);
  });

  it('the cart should be initially closed', () => {
    const state = getState();

    expect(state.open).to.be.false;
  });

  it('should open the cart', () => {
    actions.cartActions.toggleCart();

    const state = getState();
    expect(state.open).to.be.true;
  });

  it('should open and close the cart using an argument', () => {
    let state;
    actions.cartActions.toggleCart({open: true});

    state = getState();
    expect(state.open).to.be.true;

    actions.cartActions.toggleCart({open: false});

    state = getState();
    expect(state.open).to.be.false;
  });

  it('should add an item', () => {
    actions.cartActions.update(id);
    const state = getItemState(id);

    expect(state.quantity).to.equal(1);
    expect(getTotal()).to.equal(prices[1] + prices[2]);
  });

  it('should increment an item\'s quantity', () => {
    actions.cartActions.update(id, {method: 'increment'});
    const state = getItemState(id);

    expect(state.quantity).to.equal(2);
    expect(getTotal()).to.equal(prices[1] + (prices[2] * 2));
  });

  it('should decrement an item', () => {
    actions.cartActions.update(id, {method: 'decrement'});
    const state = getItemState(id);

    expect(state.quantity).to.equal(1);
    expect(getTotal()).to.equal(prices[1] + prices[2]);
  });

  it('should remove an item from the store if it\'s quantity is zero', () => {
    actions.cartActions.update(id, {method: 'decrement'});
    const state = getItemState(id);

    expect(state).to.be.undefined;
    expect(getTotal()).to.equal(prices[1]);
  });
});
