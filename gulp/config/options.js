import {srcFolder, buildFolder} from './paths.js';
import {argv} from 'node:process';

const isProd = argv.includes('--build');

const options = {
  isProd: false,
  server: {
    server: {baseDir: buildFolder},
    port: 3000,
  },
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
};

export {options};
