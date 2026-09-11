import { paths } from '../config/paths.js';
import { bs } from '../config/browser-sync.js';

import gulp from 'gulp';
const { src, dest } = gulp;

export const fonts = () => {
  return src(paths.src.fonts, { allowEmpty: true })
    .pipe(dest(paths.build.fonts))
    .pipe(bs.stream());
};
