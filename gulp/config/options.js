import { buildFolder } from './paths.js';
import { env } from 'node:process';

const isProd = env.NODE_ENV === 'production';

const options = {
  browserSync: {
    server: {
      baseDir: buildFolder,
      directory: true,
    },
    port: 3000,
    open: true,
    notify: false,
    // Middleware для SPA
    middleware: (req, res, next) => {
      // Если запрос не на файл, перенаправляем на index.html
      if (!req.url.includes('.')) {
        req.url = '/index.html';
      }
      next();
    },
    logLevel: 'info',
    logPrefix: 'Gulp',
    reloadDelay: 100,
    reloadDebounce: 200,
    injectChanges: true,
  },
  isProd,
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
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
    },
  },
  rename: {
    suffix: '.min',
  },
  errorHandler: function (err) {
    console.error('Error:', err.message);
    this.emit('end');
  }
};

export { options };
