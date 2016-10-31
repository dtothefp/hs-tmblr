import {expect} from 'chai';
import fetchMock from 'fetch-mock';
import {products} from '../../../data/db';
import flux from '../../../src/js/modules/bootstrap';
import curr from '../../../src/js/utils/currency-to-number';

fetchMock.get('http://localhost:3000/products', products);

describe('products-flux-module', () => {
  const {store, actions} = flux();
  const getState = () => store.getState().products;

  it('should initialize product items from the api', async () => {
    await actions.productActions.init();

    const productHash = products.reduce((acc, {id, price, ...rest}) => ({
      ...acc,
      [id]: Object.assign(rest, {price: curr(price)})
    }), {});
    const state = getState();

    expect(state).to.eql(productHash);
  });
});
