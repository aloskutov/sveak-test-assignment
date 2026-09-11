// gulp/utils/watcher.js
import process from 'node:process';
import gulp from 'gulp';
const { watch } = gulp;

import { paths } from '../config/paths.js';

import { html } from '../tasks/html.js';
import { styles, stylesPassthrough } from '../tasks/styles.js';
import { webpack } from '../tasks/webpack.js';
import { images } from '../tasks/images.js';
import { favicons } from '../tasks/favicons.js';
import { fonts } from '../tasks/fonts.js';

// We’re keeping active watchers — they need to be closed on shutdown
export const watchers = [];

export const watcher = (cb) => {
  watchers.push(watch([paths.watch.html], html));
  watchers.push(watch([paths.watch.sass], styles));
  watchers.push(watch([paths.watch.css], stylesPassthrough));
  watchers.push(watch([paths.watch.js], webpack));
  watchers.push(watch([paths.watch.images], images));
  watchers.push(watch([paths.watch.favicons], favicons));
  watchers.push(watch([paths.watch.fonts], fonts));

  watchers.push(
    watch(['./gulp/config/**/*.js', './gulpfile.js'], () => {
      console.log('Config changed. Please restart "npm run dev".');
      process.exit(0);
    })
  );

  console.log('Watching for changes...');
  cb();
};
