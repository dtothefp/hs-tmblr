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
    generate: true,
    rules: {
      'react/forbid-prop-types': 0
    }
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
    }
  },
  babel: {
    exclude(config, fp) {
      if (/fetch-jsonp/.test(fp)) {
        return true;
      }
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
