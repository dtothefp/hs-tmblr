import currency from '../utils/currency-to-number';
import Src from './tags/Src';

/**
 * Funny, have to use `module.exports` here because the nunjucks-loader
 * interpolates a string for "require", assuming that since it is a dynamic
 * require it will have a `.defaults` property and will not be a function.
 * Potentially use the babel-plugin-add-module-exports
 */
module.exports = function(env) {
  const globals = {};
  const filters = {
    currency
  };

  Object.keys(globals).forEach(name => {
    env.addGlobal(name, globals[name]);
  });

  Object.keys(filters).forEach(name => {
    env.addFilter(name, filters[name]);
  });

  env.addExtension('src', new Src());
};
