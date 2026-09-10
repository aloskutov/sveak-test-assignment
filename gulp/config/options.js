import { buildFolder } from './paths.js';
import { env } from 'node:process';

const isProd = env.NODE_ENV === 'production';

const options = {
  browserSync: {
    server: {
      baseDir: buildFolder,
      directory: true,
      logLevel: 'info',
      logPrefix: 'Gulp'
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
    reloadDelay: 100,
    reloadDebounce: 200,
    injectChanges: true,
  },
  isProd,
  pug: {
    pretty: true,
  },
  autoprefixer: {
    Browserslist: ['last 8 versions'],
    cascade: true,
  },
  CSSbeautify: {
    indent: '  ',
  },
  webpack: {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'source-map',
  cache: { type: 'filesystem' },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
    },
  },
  rename: {
    suffix: '.min',
  },
  sass: {
    sourcemap: true,
  },
  errorHandler: function (err) {
    console.error('Error:', err.message);
    this.emit('end');
  }
};

export { options };
