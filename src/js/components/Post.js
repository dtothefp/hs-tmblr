import React, {Children, PropTypes} from 'react';
import cx from 'classnames';
import rit from '../utils/render-if-truthy';

const renderPhotos = (photos, classPrefix) => {
  if (!photos.length) return null;

  const lastIdx = photos.length - 1;

  // TODO: add masonry or something fancy here
  return (
    <div className={`${classPrefix}__post-images`}>
      {photos.map((img, i) => {
        const {original_size: {url}} = img;
        const classes = cx(`${classPrefix}__post-images-img`, {
          'is-last': i === lastIdx,
          'is-first': i === 0
        });

        return (
          <img
            src={url}
            role="presentation"
            className={classes}
            key={`${url}_${i}`}
          />
        );
      })}
    </div>
  );
};

const Post = props => {
  const {classPrefix, post, children, ...rest} = props;
  const {
    post_url: href,
    summary,
    photos = []
  } = post;
  return (
    <div className={`${classPrefix}__post`} {...rest}>
      {rit(summary, () => (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <p className={`${classPrefix}__post-summary`}>{summary}</p>
        </a>
      ))}
      {renderPhotos(photos, classPrefix)}
      {Children.only(children)}
    </div>
  );
};

Post.propTypes = {
  children: PropTypes.element.isRequired,
  classPrefix: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired
};

export default Post;
