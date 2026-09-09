import {paths} from '../config/paths.js';
import { bs } from '../config/browser-sync.js';

import gulp from 'gulp';
const {src, dest} = gulp;

import plumber from 'gulp-plumber';

const images = () => {
  return src(paths.src.images, {encoding: false})
    .pipe(plumber())
    .pipe(dest(paths.build.images))
    .pipe(bs.stream());
};

export {images};
