// gulp/utils/watcher.js
import gulp from 'gulp';
const { watch } = gulp;

import { paths } from '../config/paths.js';

import { html } from '../tasks/html.js';
import { styles, stylesPassthrough } from '../tasks/styles.js';
import { webpack } from '../tasks/webpack.js';
import { images } from '../tasks/images.js';

// Храним активные watcher'ы — их нужно закрыть при shutdown
export const watchers = [];

export const watcher = () => {
  watchers.push(watch([paths.watch.html], html));
  watchers.push(watch([paths.watch.sass], styles));
  watchers.push(watch([paths.watch.css], stylesPassthrough));
  watchers.push(watch([paths.watch.js], webpack));
  watchers.push(watch([paths.watch.images], images));

  console.log('Watching for changes...');
};
