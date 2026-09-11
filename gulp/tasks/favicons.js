import { paths } from '../config/paths.js';
import { bs } from '../config/browser-sync.js';

import gulp from 'gulp';
const { src, dest } = gulp;

export const favicons = () => {
  return src(paths.src.favicons, { allowEmpty: true })
    .pipe(dest(paths.build.favicons))
    .pipe(bs.stream());
};
