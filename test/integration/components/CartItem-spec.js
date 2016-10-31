import {expect} from 'chai';
import sinon from 'sinon';
import trigger from 'trigger-event';
import CartItem from '../../../src/js/components/CartItem';

describe('#CartItem', () => {
  const id = 1;
  const spy = sinon.spy();
  const cartActions = {
    update: spy
  };
  const actions = {
    cartActions
  };
  const state = {
    price: 100
  };
  const comp = new CartItem(actions, {id, state});
  const $elm = comp.elm;
  const [increment, decrement] = $elm.querySelectorAll(`[data-js-quantity]`);

  it('should create a cart item element', () => {
    expect($elm).to.have.class('cart__items-item');
  });

  it('should add the state as context', () => {
    const quantity = $elm.querySelector(`[data-js-update="quantity"]`);
    const price = $elm.querySelector(`[data-js-update="price"]`);

    expect(quantity).to.have.text('1');
    expect(price).to.have.text(`${state.price}`);
  });

  it('should add a cart item', () => {
    trigger(increment, 'click', {
      bubbles: true
    });

    expect(spy.calledOnce).to.be.true;
    expect(spy.getCall(0).args).to.eql(
      [id, {method: 'increment'}]
    );

    comp.update({quantity: 2});

    expect(comp.observers.quantity).to.have.text('2');
  });

  it('should remove a product', () => {
    trigger(decrement, 'click', {
      bubbles: true
    });

    expect(spy.calledTwice).to.be.true;
    expect(spy.getCall(1).args).to.eql(
      [id, {method: 'decrement'}]
    );

    comp.update({quantity: 1});

    expect(comp.observers.quantity).to.have.text('1');
  });
});

