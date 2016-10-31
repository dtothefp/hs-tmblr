import {expect} from 'chai';
import sinon from 'sinon';
import trigger from 'trigger-event';
import Product from '../../../src/js/components/Product';

describe('#Product', () => {
  const id = 1;
  const spy = sinon.spy();
  const cartActions = {
    update: spy
  };
  const actions = {
    cartActions
  };
  const state = {
    name: 'bleep',
    description: 'bloop',
    price: 100,
    added: false
  };
  const comp = new Product(actions, {id, state});
  const $elm = comp.elm;

  it('should create a product element', () => {
    expect($elm).to.have.class('products__product');
  });

  it('should add the state as context', () => {
    const selector = '.products__product-content';
    const name = $elm.querySelector(`${selector} h4`);
    const description = $elm.querySelector(`${selector} p`);
    const price = $elm.querySelector('.products__product-cta span');

    expect(name).to.have.text(state.name);
    expect(description).to.have.text(state.description);
    expect(price).to.have.text(`${state.price}`);
  });

  it('should add a product', () => {
    trigger(comp.observers.add, 'click');

    expect(spy.calledOnce).to.be.true;
    expect(spy.getCall(0).args[0]).to.equal(id);

    comp.update(true);

    expect(comp.observers.add).to.have.text('Remove');
  });

  it('should remove a product', () => {
    trigger(comp.observers.add, 'click');

    expect(spy.calledTwice).to.be.true;
    expect(spy.getCall(1).args).to.eql(
      [id, {method: 'remove'}]
    );

    comp.update();

    expect(comp.observers.add).to.have.text('Add to Cart');
  });
});
