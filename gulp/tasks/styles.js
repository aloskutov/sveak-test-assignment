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
import cleanCSS from 'gulp-cleaner-css';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

const styles = () => {
  let pipeline = src(paths.src.css, options.sass)
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('SASS error:', err.message);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(autoprefixer(options.autoprefixer));

  if (options.isProd) {
    pipeline = pipeline
      .pipe(cleanCSS())
      .pipe(rename(options.rename));
  } else {
    pipeline = pipeline.pipe(CSSbeautify(options.CSSbeautify));
  }

  return pipeline
    .pipe(sourcemaps.write('.'))
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
