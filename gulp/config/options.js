import { srcFolder, buildFolder } from './paths.js';
import { argv } from 'node:process';

const isProd = argv.includes('--build');

const options = {
  server: {
    server: {
      baseDir: buildFolder,
      directory: true,
      open: true,
      notify: false,
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
  },
  isProd: false,
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
    devtool: !isProd ? 'source-map' : false,
    output: {
      filename: '[name].js',
    },
  },
  rename: {
    suffix: '.min',
  },
  sass: {
    sourcemap: true,
  },
  browserSync: {
    reloadDelay: 100,
    reloadDebounce: 200,
    injectChanges: true
  }
};

export { options };
