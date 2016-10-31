import path from 'path';
import merge from 'lodash/merge';

const includePaths = [
  require.resolve('normalize-scss')
].map(path.dirname.bind(path));

export default {
  assemble: {
    minify: true
  },
  browserSync: {
    open: true
  },
  eslint: {
    generate: true
  },
  webpack: {
    shouldRev: true,
    includePaths,
    integrity: 'sha256',
    expose: {},
    alias: {
      redux: 'redux/lib/index.js' // jsnext:main breaks karma ¯\_(ツ)_/¯
    },
    externals: [
      {
        name: {
          jquery: 'jQuery'
        },
        provide: {
          'global.jQuery': 'jquery',
          'window.jQuery': 'jquery',
          '$': 'jquery'
        }
      }
    ],
    hot: true,
    plugins(config, p) {
      const envConfig = {
        'process.env': {
          API: JSON.stringify('http://localhost:3000')
        }
      };

      return p.reduce((list, inst) => {
        if (inst.constructor.name === 'DefinePlugin') {
          merge(inst.definitions, envConfig);
        }

        return [...list, inst];
      }, []);
    },
    loaders(config, l) {
      const {loaders} = l;
      const nunjucksLoader = {
        test: /\.html$/,
        loader: 'nunjucks',
        query: {
          config: path.resolve(__dirname, '..', '..', 'src/js/config/nunjucks-config.js')
        }
      };
      const [babelLoader] = loaders;
      const ogExclude = babelLoader.exclude;
      const exclude = fp => {
        if (fp.indexOf('nunjucks-config') > 0) {
          return false;
        }

        return ogExclude(fp);
      };

      babelLoader.exclude = exclude;
      loaders.push(nunjucksLoader);

      return l;
    }
  },
  cb(config) {
    const {environment} = config;
    const {branch, asset_path: assetPath} = environment;

    if (branch) {
      Object.assign(environment, {
        asset_path: assetPath.replace(branch + '/', '')
      });
    }

    return config;
  }
};
