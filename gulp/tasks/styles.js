import { paths } from '../config/paths.js';
import { options } from '../config/options.js';
import { bs } from '../config/browser-sync.js';

import gulp from 'gulp';
const { src, dest } = gulp;

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import CSSbeautify from 'gulp-cssbeautify';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

const styles = () => {
  let pipeline = src(paths.src.css)
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('SASS error:', err.message);
        this.emit('end');
      }
    }));
  if (!options.isProd) {
    pipeline = pipeline.pipe(sourcemaps.init());
  }
  pipeline = pipeline
    .pipe(sass(options.sass))
    .pipe(autoprefixer(options.autoprefixer));

  if (options.isProd) {
    pipeline = pipeline
      .pipe(rename(options.rename));
  } else {
    pipeline = pipeline.pipe(CSSbeautify(options.CSSbeautify));
  }

  if (!options.isProd) {
    pipeline = pipeline.pipe(sourcemaps.write('.', { includeContent: false }));
  }

  return pipeline
    .pipe(dest(paths.build.css))
    .pipe(bs.stream());
};

const stylesPassthrough = () => {
  return src(paths.src.cssPassthrough)
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('CSS error:', err.message);
        this.emit('end');
      }
    }))
    .pipe(dest(paths.build.css))
    .pipe(bs.stream());
};

export { styles, stylesPassthrough };
