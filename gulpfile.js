'use strict';

import gulp from 'gulp';
const { task, series, parallel, watch } = gulp;

// Config
import { paths } from './gulp/config/paths.js';
import { options } from './gulp/config/options.js';
import { bs } from './gulp/config/browser-sync.js';

// Tasks
import { clean } from './gulp/tasks/clean.js';
import { styles, stylesPassthrough } from './gulp/tasks/styles.js';
import { html } from './gulp/tasks/html.js';
import { webpack } from './gulp/tasks/webpack.js';
import { images } from './gulp/tasks/images.js';

const server = (cb) => {
  bs.init(options.server,
    (err) => {
    if (err) {
      console.error('BrowserSync initialization error:', err);
      cb(err);
      return;
    }
    console.log('BrowserSync initialized successfully');
    cb();
  });
};

const watcher = () => {
  watch([paths.watch.html], html);
  watch([paths.watch.css], styles);
  watch([paths.watch.js], webpack);
  watch([paths.watch.images], images);

  console.log('Watching for changes...');
};

const build = series(
  clean,
  parallel(html, webpack, styles, stylesPassthrough, images)
);

const dev = series(build, parallel(server, watcher));

export { build, dev };
export default dev;
task('clean', clean);
task('build', build);
task('dev', dev);
