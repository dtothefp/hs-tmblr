import pick from 'lodash/pick';

const whitelist = [
  'blog_name',
  'summary',
  'photos',
  'post_url'
];

export default function(posts = []) {
  return posts.map((post) => pick(post, whitelist));
}