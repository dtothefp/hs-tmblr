import React, {Children, PropTypes} from 'react';

const getStyle = imgs => {
  const [img] = imgs.slice(-1);
  const {url, height, width} = img;

  return {
    backgroundImage: `url('${url}')`,
    height: `${height}px`,
    width: `${width}px`
  };
};
const Post = props => {
  const {classPrefix, post, children, ...rest} = props;
  const {
    post_url: href,
    summary,
    photos = []
  } = post;
  const renderPhotos = () => (
    <div className={`${classPrefix}__post-images`}>
      {photos.map(({alt_sizes: img}, i) => (
        <div
          className={`${classPrefix}__post-images-img`}
          style={getStyle(img)}
          key={`img_${i}`}
        />
      ))}
    </div>
  );

  return (
    <div className={`${classPrefix}__post`} {...rest}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <p className={`${classPrefix}__post-summary`}>{summary}</p>
      </a>
      {photos.length ? renderPhotos() : null}
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
