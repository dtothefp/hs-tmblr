import pick from 'lodash/pick';

const whitelist = [
  'id',
  'blog_name',
  'summary',
  'photos',
  'post_url'
];

/**
 * Plug off desired keys from the posts response
 * @param {Array} posts
 * @return {Array}
 */
export default function(posts = []) {
  return posts.map((post) => pick(post, whitelist));
}
