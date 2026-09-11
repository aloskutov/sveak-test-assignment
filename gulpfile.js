import gulp from 'gulp';
const { series, parallel } = gulp;

// Tasks
import { clean } from './gulp/tasks/clean.js';
import { styles, stylesPassthrough } from './gulp/tasks/styles.js';
import { html } from './gulp/tasks/html.js';
import { webpack } from './gulp/tasks/webpack.js';
import { images } from './gulp/tasks/images.js';
import { favicons } from './gulp/tasks/favicons.js';
import { fonts } from './gulp/tasks/fonts.js';

// Utils
import { server } from './gulp/utils/server.js';
import { watcher } from './gulp/utils/watcher.js';
import { registerShutdown } from './gulp/utils/shutdown.js';

registerShutdown();

const build = series(
  clean,
  parallel(html, webpack, styles, stylesPassthrough, images, favicons, fonts)
);

const dev = series(build, parallel(server, watcher));

export { build, dev, clean };
export default dev;
