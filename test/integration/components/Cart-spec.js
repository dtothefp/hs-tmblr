import {expect} from 'chai';
import fetchMock from 'fetch-mock';
import trigger from 'trigger-event';
import {products} from '../../../data/db';
import flux from '../../../src/js/modules/bootstrap';
import Cart from '../../../src/js/components/Cart';
import curr from '../../../src/js/utils/currency-to-number';

describe('#Cart', () => {
  const mockCart = [{id: '1'}];

  fetchMock.get('http://localhost:3000/cart_order', mockCart);
  fetchMock.get('http://localhost:3000/products', products);

  const {store, actions} = flux();
  const comp = new Cart(store, actions);
  const $elm = comp.elm;

  it('should create a cart element', () => {
    expect($elm).to.have.class('cart');
  });

  it('should not have any cart items before the state is updated', () => {
    const elm = comp.render();
    const {children} = elm;
    const [header, items, feature] = [...children];

    expect(elm).to.equal($elm);
    expect(children.length).to.equal(3);
    expect(header).to.have.class('cart__header');
    expect(items).to.have.class('cart__items');
    expect(feature).to.have.class('cart__feature');
    expect(items.querySelectorAll('.cart__items-item').length).to.equal(0);
  });

  it('should update it\'s state from the store', async () => {
    await Promise.all([
      actions.productActions.init(),
      actions.cartActions.init()
    ]);

    const [product] = products;
    const elm = comp.render();
    const {children} = elm;
    const items = children[1];
    const name = items.querySelector('h6');
    const quantity = items.querySelector('[data-js-update="quantity"]');
    const price = items.querySelector('[data-js-update="price"]');

    expect(items.querySelectorAll('.cart__items-item').length).to.equal(1);
    expect(name).to.have.text(product.name);
    expect(quantity).to.have.text('1');
    expect(price).to.have.text(`${curr(product.price)}`);
  });

  it('should increment the quantity', () => {
    const {children} = $elm;
    const items = children[1];
    const [increment] = [...$elm.querySelectorAll('[data-js-quantity]')];
    const quantity = items.querySelector('[data-js-update="quantity"]');

    trigger(increment, 'click', {
      'bubbles': true
    });

    expect(quantity).to.have.text('2');
  });

  it('should decrement the quantity', () => {
    const {children} = $elm;
    const items = children[1];
    const [, decrement] = [...$elm.querySelectorAll('[data-js-quantity]')];
    const quantity = items.querySelector('[data-js-update="quantity"]');

    trigger(decrement, 'click', {
      bubbles: true
    });

    expect(quantity).to.have.text('1');
  });

  it('should remove the item if decremented to zero', () => {
    const {children} = $elm;
    const items = children[1];
    const [, decrement] = [...$elm.querySelectorAll('[data-js-quantity]')];

    trigger(decrement, 'click', {
      bubbles: true
    });

    expect(items.querySelectorAll('.cart__items-item').length).to.equal(0);
  });
});
