import { buildFolder } from './paths.js';
import { env } from 'node:process';

const isProd = env.NODE_ENV === 'production';
const publicPath = env.PUBLIC_PATH || '/assets';

const options = {
  browserSync: {
    server: {
      baseDir: buildFolder,
    },
    port: 3000,
    open: true,
    notify: false,
    logLevel: 'info',
    logPrefix: 'Gulp',
    reloadDelay: 100,
    reloadDebounce: 200,
    injectChanges: true,
  },
  isProd,
  publicPath,
  pug: {
    pretty: true,
  },
  autoprefixer: {
    overrideBrowserslist: ['last 8 versions'],
    cascade: true,
  },
  CSSbeautify: {
    indent: '  ',
  },
  sass: {
    style: isProd ? 'compressed' : 'expanded',
    sourceMap: !isProd,
  },
  webpack: {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  cache: isProd ? { type: 'filesystem' } : false,
  output: {
      publicPath: publicPath + '/js/',
    filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
  },
  rename: {
    suffix: '.min',
  },
};

export { options };
