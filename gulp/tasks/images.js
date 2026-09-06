import {paths} from '../config/paths.js';

import gulp from 'gulp';
const {src, dest} = gulp;

import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';

const images = () => {
  return src(paths.src.images, {encoding: false})
    .pipe(plumber())
    .pipe(dest(paths.build.images))
    .pipe(browserSync.stream());
};

export {images};
