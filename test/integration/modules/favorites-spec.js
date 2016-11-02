import {expect} from 'chai';
import omit from 'lodash/omit';
import posts from '../mocks/blog';
import tagged from '../mocks/tagged';
import api from '../../../src/js/services/api';
import bootstrap from '../../../src/js/modules/bootstrap';
import shape from '../../../src/js/utils/shape-posts-response';

describe('#favorites', () => {
  const {store, actions} = bootstrap();
  const [firstBlog] = posts.response.posts;
  const {id: blogId} = firstBlog;
  const [firstTagged] = tagged.response;
  const {id: taggedId} = firstTagged;
  const shaped = shape([firstBlog, firstTagged]);

  before(async () => {
    api.__Rewire__('jsonp', (url, opts, fn) => {
      if (/blog/.test(url)) {
        fn(null, posts);
      } else if (/tagged/.test(url)) {
        fn(null, tagged);
      }
    });
  });

  after(() => {
    api.__ResetDependency__('jsonp');
  });

  describe('add and remove favorites', () => {
    before(async () => {
      await actions.postActions.init({blog: 'bloop'});
    });

    it('should add a favorite', () => {
      actions.favoriteActions.update(blogId, {method: 'add'});
      const {posts: {list}, favorites} = store.getState();

      expect(favorites.length).to.equal(1);
      expect(favorites[0]).to.eql(list[0]);
    });

    it('should remove a favorite', () => {
      actions.favoriteActions.update(blogId, {method: 'remove', name});
      const {favorites} = store.getState();

      expect(favorites.length).to.equal(0);
    });
  });

  describe('add and remove favorites from a different blog', () => {
    before(async () => {
      actions.favoriteActions.update(blogId, {method: 'add'});
      await actions.postActions.init({tag: 'bleep'});
    });

    it('should add a favorite', () => {
      actions.favoriteActions.update(taggedId, {method: 'add'});
      const {favorites} = store.getState();

      expect(favorites.length).to.equal(2);
      expect(favorites[0].id).to.equal(shaped[0].id);
      expect(favorites[1].id).to.equal(shaped[1].id);
    });

    it('should remove a favorite', () => {
      actions.favoriteActions.update(taggedId, {method: 'remove'});
      const {favorites} = store.getState();

      expect(favorites.length).to.equal(1);
      expect(favorites[0].id).to.equal(shaped[0].id);
    });
  });
});
