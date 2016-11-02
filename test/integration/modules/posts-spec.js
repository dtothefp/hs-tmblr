import {expect} from 'chai';
import sinon from 'sinon';
import posts from '../mocks/blog';
import api from '../../../src/js/services/api';
import bootstrap from '../../../src/js/modules/bootstrap';

describe('#products', () => {
  const {store, actions} = bootstrap();
  const spy = sinon.spy();

  before(() => {
    api.__Rewire__('jsonp', (url, opts, fn) => {
      spy(url, opts);
      fn(null, posts);
    });
  });

  after(() => {
    api.__ResetDependency__('jsonp');
  });

  describe('loading', () => {
    it('should add a loading key while the posts are loading', async () => {
      const prom = actions.postActions.init({blog: 'bloop'});
      let state = store.getState();
      expect(state.posts.loading).to.be.true;

      await prom;
      state = store.getState();
      expect(state.posts.loading).to.be.false;
    });
  });

  describe('success', () => {
    afterEach(() => {
      spy.reset();
    });

    it('should work for blog', async () => {
      await actions.postActions.init({blog: 'bloop'});
      const [url, options] = spy.getCall(0).args;

      expect(url).to.contain('/blog/bloop.tumblr.com');
      expect(options).to.have.all.keys(['timeout']);
    });

    it('should work for a blog/tagged combo', async () => {
      await actions.postActions.init({blog: 'bloop', tag: 'bleep'});
      const [url] = spy.getCall(0).args;

      expect(url).to.contain('tag=bleep');
    });

    it('should work for a tag without a blog', async () => {
      await actions.postActions.init({tag: 'bleep'});
      const [url] = spy.getCall(0).args;

      expect(url).to.contain('/tagged');
      expect(url).to.contain('tag=bleep');
    });
  });

  describe('failure', () => {
    it('should throw for missing tag and blog', async () => {
      const noArgsProm = actions.postActions.init();
      expect(noArgsProm).to.eventually.throw();
    });
  });
});
