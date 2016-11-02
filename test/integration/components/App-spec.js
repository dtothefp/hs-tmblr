/* eslint react/no-find-dom-node: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import {Provider} from 'react-redux';
import TestUtils from 'react/lib/ReactTestUtils';
import posts from '../mocks/blog';
import tagged from '../mocks/tagged';
import App from '../../../src/js/components/App';
import bootstrap from '../../../src/js/modules/bootstrap';
import api from '../../../src/js/services/api';

describe('#App', () => {
  const {Simulate} = TestUtils;
  const {store, actions} = bootstrap();
  const nextTick = () => new Promise(res => setTimeout(res, 0));
  const mockPosts = posts.response.posts;
  const mockTagged = tagged.response;
  let app, parent, button, blog, tag, form;

  before(() => {
    api.__Rewire__('jsonp', (url, opts, fn) => {
      if (/blog/.test(url)) {
        fn(null, posts);
      } else if (/tagged/.test(url)) {
        fn(null, tagged);
      }
    });

    const comp = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <App actions={actions} />
      </Provider>
    );

    app = ReactDOM.findDOMNode(comp);
    parent = app.parentElement;
    form = app.querySelector('form');
    blog = form.querySelector('[name=blog]');
    tag = form.querySelector('[name=tag]');
    button = form.querySelector('button');
  });

  after(() => {
    api.__ResetDependency__('jsonp');
    ReactDOM.unmountComponentAtNode(parent);
  });

  it('should render the App', () => {
    const [column1, column2] = [...app.children];

    expect(app).to.have.class('app');
    expect(column1).to.have.class('app__column-first');
    expect(column2).to.have.class('app__column-last');
  });

  it('should add posts on form submission', async () => {
    blog.value = 'peacecorps';
    Simulate.change(blog);
    Simulate.submit(button);
    await nextTick();
    const posts = app.querySelector('.posts');
    const {children} = posts;
    const summary = children[0].querySelector('p');

    expect(children.length).to.equal(mockPosts.length);
    expect(summary).to.have.text(mockPosts[0].summary);
  });

  it('should add favorites from posts', () => {
    const post = app.querySelector('.posts__post');
    const addFavButton = post.querySelector('button');
    Simulate.click(addFavButton);

    const favorite = app.querySelector('.favorites__post');

    expect(favorite).to.exist;
    expect(favorite.querySelector('p')).to.have.text(mockPosts[0].summary);
  });

  it('should add tagged posts', async () => {
    blog.value = '';
    tag.value = 'gif';
    Simulate.change(blog);
    Simulate.change(tag);
    Simulate.submit(button);
    await nextTick();

    const posts = app.querySelector('.posts');
    const {children} = posts;
    const summary = children[0].querySelector('p');

    expect(children.length).to.equal(mockTagged.length);
    expect(summary).to.have.text(mockTagged[0].summary);
  });

  it('should remove favorites', () => {
    const removePostBtn = app.querySelector('.favorites__post button');
    Simulate.click(removePostBtn);
    const favorite = app.querySelector('.favorites__post');

    expect(favorite).not.to.exist;
  });
});
