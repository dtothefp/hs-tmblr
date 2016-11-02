import React, {Component, PropTypes} from 'react';
import capitalize from 'lodash/capitalize';

export default class Posts extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  static contextTypes = {
    actions: PropTypes.object.isRequired
  };

  isAdded({name, id}) {
    const {state} = this.props;
    const {favorites} = state;

    return favorites[name] && favorites[name][id];
  }

  renderImages(imgs = []) {
    if (imgs.length === 0) return null;

    return imgs.map(({original_size: img}, i) => (
      <div className="posts__post-img" key={`post_img_${i}`}>
        <img src={img.url} role="presentation" />
      </div>
    ));
  }


  renderPosts() {
    const {handleClick, state} = this.props;
    const {posts} = state;
    const {list = []} = posts;

    return list.map((post, i) => {
      const {
        blog_name: name,
        post_url: href,
        summary,
        photos = []
      } = post;
      const added = this.isAdded({name, id: i});
      const method = added ? 'remove' : 'add';
      const handler = handleClick(i, {
        name,
        method
      });

      return (
        <div className="posts__post" key={`post_${i}`}>
          <a href={href} target="_blank" rel="noopener noreferrer">{name}</a>
          <p className="posts__post-summary">{summary}</p>
          {this.renderImages(photos)}
          <button
            onClick={handler}
            disabled={added}
          >{capitalize(method)}</button>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="posts">
        {this.renderPosts()}
      </div>
    );
  }
}
