import React, {Component, PropTypes} from 'react';
import Post from './Post';
import rit from '../utils/render-if-truthy';

export default class Posts extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired
  };

  static contextTypes = {
    actions: PropTypes.object.isRequired
  };

  handleAdd(id) {
    const {actions} = this.context;
    return e => {
      e.preventDefault();
      actions.favoriteActions.update(id, {method: 'add'});
    };
  }

  renderPosts() {
    const {state} = this.props;
    const {added, posts} = state;
    const {list = []} = posts;
    const classPrefix = 'posts';

    return list.map((post, i) => {
      const {id} = post;
      const isAdded = added.includes(id);
      const buttonText = isAdded ? 'Added' : 'Add';

      return (
        <Post classPrefix={classPrefix} post={post} key={`post_${i}`}>
          <button
            type="button"
            onClick={this.handleAdd(id)}
            disabled={isAdded}
          >{buttonText}</button>
        </Post>
      );
    });
  }

  render() {
    const {posts} = this.props.state;
    const {failed} = posts;

    return (
      <div className="posts">
        {rit(failed, () => <p className="is-failure">Failed to load posts</p>)}
        {rit(!failed, () => this.renderPosts())}
      </div>
    );
  }
}
