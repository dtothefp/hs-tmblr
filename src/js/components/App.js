import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Form from './Form';
import Posts from './Posts';
import Favorites from './Favorites';

@connect(({favorites = [], posts}) => ({
  added: favorites.map(({id}) => id),
  favorites,
  posts
}))
export default class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    added: PropTypes.array.isRequired,
    favorites: PropTypes.array.isRequired,
    posts: PropTypes.object.isRequired
  };

  static childContextTypes = {
    actions: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      actions: this.props.actions
    };
  }

  render() {
    const {added, favorites, posts} = this.props;

    return (
      <div className="app">
        <div className="app__column-first">
          <Form />
          <Posts state={{posts, added}} />
        </div>
        <div className="app__column-last">
          <Favorites state={favorites} />
        </div>
      </div>
    );
  }
}
