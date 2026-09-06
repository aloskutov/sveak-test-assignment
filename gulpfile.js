'use strict';

import gulp from 'gulp';
const { task, series, parallel } = gulp;

// Config
import { paths } from './gulp/config/paths.js';
import { options } from './gulp/config/options.js';

// Tasks
import { clean } from './gulp/tasks/clean.js';
import { styles, stylesPassthrough } from './gulp/tasks/styles.js';
import { html } from './gulp/tasks/html.js';
import { webpack } from './gulp/tasks/webpack.js';
import { images } from './gulp/tasks/images.js';

import browserSync from 'browser-sync';

const watchFiles = async (cb) => {
  try {
    browserSync.init(options.server, (err) => {
      if (err) {
        console.error('BrowserSync initialization error:', err);
        cb(err);
        return;
      }
      console.log('BrowserSync initialized successfully');
    });
  } catch (err) {
    console.error('BrowserSync initialization error:', err);
    cb(err);
    return;
  }

  gulp.watch([paths.watch.html], html);
  gulp.watch([paths.watch.css], styles);
  gulp.watch([paths.watch.js], webpack);
  gulp.watch([paths.watch.images], images);

  cb();
};

const build = series(
  clean,
  parallel(html, webpack, styles, stylesPassthrough, images)
);

const watch = series(build, watchFiles);

export default watch;
task('clean', clean);
task('build', build);
task('watch', watch);
