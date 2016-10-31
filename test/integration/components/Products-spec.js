import {expect} from 'chai';
import fetchMock from 'fetch-mock';
import trigger from 'trigger-event';
import {products} from '../../../data/db';
import flux from '../../../src/js/modules/bootstrap';
import Products from '../../../src/js/components/Products';

describe('#Products', () => {
  fetchMock.get('http://localhost:3000/products', products);
  const {store, actions} = flux();
  const comp = new Products(store, actions);
  const $elm = comp.elm;

  it('should create a products element', () => {
    expect($elm).to.have.class('products');
  });

  it('should not have any children before the state is updated', () => {
    const elm = comp.render();
    const {children} = elm;

    expect(elm).to.equal($elm);
    expect(children.length).to.equal(1);
    expect(children[0]).to.have.class('products__header');
  });

  it('should update it\'s state from the store', async () => {
    await actions.productActions.init();

    const elm = comp.render();
    const {children} = elm;
    const [header, ...products] = [...children];

    expect(children.length).to.equal(4);
    expect(header).to.have.class('products__header');
    [...products].forEach(child => {
      expect(child).to.have.class('products__product');
    });
  });

  it('should add a product', () => {
    const [button] = [...$elm.querySelectorAll('[data-js-update]')];

    trigger(button, 'click');
    expect(button).to.have.text('Remove');
  });

  it('should remove a product', () => {
    const [button] = [...$elm.querySelectorAll('[data-js-update]')];

    trigger(button, 'click');
    expect(button).to.have.text('Add to Cart');
  });
});
