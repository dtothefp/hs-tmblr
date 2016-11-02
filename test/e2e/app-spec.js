import {expect} from 'chai';

describe('App', () => {
  const client = global.browser;
  const homepage = '/';

  describe('Homepage', () => {
    it(`Navigate to ${homepage}`, () => {
      client.url(homepage);
    });
  });
});
