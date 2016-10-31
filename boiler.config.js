export default {
  bucketBase: 'cart',
  presets: ['plus'],
  addons: [
    'assemble-middleware',
    ['assemble-nunjucks', {isomorphic: false}],
    'webpack-loaders-base',
    'webpack-babel',
    'webpack-karma',
    'webpack-styles'
  ]
};
