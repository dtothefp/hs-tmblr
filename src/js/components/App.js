import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Form from './Form';
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

  handleClick = (id, opts = {}) => {
    return e => {
      const {method = 'add', name} = opts;
      const {actions} = this.props;

      actions.favoriteActions.update(id, {
        name,
        method
      });
    };
  }

  render() {
    const {favorites, posts} = this.props;

    return (
      <div className="app">
        <Form />
        <Posts
          state={{posts, favorites}}
          handleClick={this.handleClick}
        />
        <Favorites
          state={favorites}
          handleClick={this.handleClick}
        />
        <Spinner />
      </div>
    );
  }
}
