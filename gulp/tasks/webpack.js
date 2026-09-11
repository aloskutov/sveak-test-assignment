// gulp/tasks/webpack.js
import { paths } from '../config/paths.js';
import { options } from '../config/options.js';
import { bs } from '../config/browser-sync.js';

import gulp from 'gulp';
const { src, dest } = gulp;

import webpackStream from 'webpack-stream';
import webpack from 'webpack';

const webpackTask = () => {
  return src(paths.src.jsEntry)
    .pipe(
      webpackStream(options.webpack, webpack, (err, stats) => {
        if (err) {
          console.error('Webpack fatal error:', err);
          return;
        }
        if (stats?.hasErrors()) {
          console.error(
            stats.toString({
              colors: true,
              chunks: false,
              modules: false,
            })
          );
        }
      })
    )
    .pipe(dest(paths.build.js))
    .pipe(bs.stream());
};

export { webpackTask as webpack };
