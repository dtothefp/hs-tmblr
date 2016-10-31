import {expect} from 'chai';

describe('App', () => {
  const client = global.browser;
  const homepage = '/';

  describe('English', () => {
    it(`Navigate to ${homepage}`, () => {
      client.url(homepage);
    });

    it('Adds the first product', () => {
      // TODO: write tests for
      // adding products
      // opening/closing cart
      // incrementing/decrementing quantity
      // removing cart items
    });
  });
});
