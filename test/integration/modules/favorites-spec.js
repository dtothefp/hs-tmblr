import {expect} from 'chai';
import omit from 'lodash/omit';
import posts from '../mocks/blog';
import tagged from '../mocks/tagged';
import api from '../../../src/js/services/api';
import bootstrap from '../../../src/js/modules/bootstrap';

describe('#favorites', () => {
  const {store, actions} = bootstrap();
  const id = 0;
  const {blog_name: blogName} = posts.response.posts[id];
  const {blog_name: taggedName} = tagged.response[id];

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
    const name = blogName;

    before(async () => {
      await actions.postActions.init({blog: 'bloop'});
    });

    it('should add a favorite', () => {
      actions.favoriteActions.update(id, {method: 'add', name});
      const {posts: storePosts, favorites} = store.getState();
      const currFavs = favorites[name];
      const post = currFavs[0];

      expect(currFavs.length).to.equal(1);
      expect(post.id).to.equal(id);
      expect(omit(post, 'id')).to.eql(storePosts.list[0]);
    });

    it('should remove a favorite', () => {
      actions.favoriteActions.update(id, {method: 'remove', name});
      const {posts: storePosts, favorites} = store.getState();

      expect(favorites[name]).to.be.undefined;
    });
  });

  describe('add and remove favorites from a different blog', () => {
    before(async () => {
      actions.favoriteActions.update(id, {method: 'add', name: blogName});
      await actions.postActions.init({tag: 'bleep'});
    });

    it('should add a favorite', () => {
      actions.favoriteActions.update(id, {method: 'add', name: taggedName});
      const {posts: storePosts, favorites} = store.getState();

      expect(favorites).to.have.all.keys([blogName, taggedName]);
      expect(favorites[blogName].length).to.equal(1);
      expect(favorites[taggedName].length).to.equal(1);
      expect(favorites[taggedName][0].id).to.equal(id);
    });

    it('should remove a favorite', () => {
      actions.favoriteActions.update(id, {method: 'remove', name: taggedName});
      const {posts: storePosts, favorites} = store.getState();

      expect(favorites).to.have.all.keys([blogName]);
      expect(favorites[blogName].length).to.equal(1);
    });
  });
});
