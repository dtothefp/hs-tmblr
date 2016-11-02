import React, {Component, PropTypes} from 'react';
import Post from './Post';

export default class Favorites extends Component {
  static propTypes = {
    state: PropTypes.array.isRequired
  };

  static contextTypes = {
    actions: PropTypes.object.isRequired
  };

  handleRemove(id) {
    const {actions} = this.context;
    return e => {
      e.preventDefault();
      actions.favoriteActions.update(id, {method: 'remove'});
    };
  }

  render() {
    const {state: favorites} = this.props;
    const classPrefix = 'favorites';

    return (
      <div className="favorites">
        <h3>Favorites:</h3>
        {favorites.map(({id, ...post}, i) => (
          <Post classPrefix={classPrefix} post={post} key={`fav_${i}`}>
            <button type="button" onClick={this.handleRemove(id)}>Remove</button>
          </Post>
        ))}
      </div>
    );
  }
}
