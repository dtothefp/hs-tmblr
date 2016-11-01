import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Posts from './Posts';
import Favorites from './Favorites';
import Spinner from './Spinner';

@connect(({favorites, posts}) => ({
  favorites,
  posts
}))
export default class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    favorites: PropTypes.object.isRequired,
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
    const {favorites, posts} = this.props;

    return (
      <div className="app">
        <Posts state={posts} />
        <Favorites state={favorites} />
        <Spinner />
      </div>
    );
  }
}
