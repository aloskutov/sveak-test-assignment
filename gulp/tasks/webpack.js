import { paths } from '../config/paths.js';
import { options } from '../config/options.js';

import gulp from 'gulp';
const { src, dest } = gulp;

import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';

const webpack = () => {
  return src(paths.src.jsEntry)
    .pipe(plumber())
    .pipe(webpackStream(options.webpack))
    .pipe(dest(paths.build.js));
};

export { webpack };
