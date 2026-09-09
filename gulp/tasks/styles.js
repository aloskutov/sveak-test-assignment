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
import removeCSSComments from 'gulp-strip-css-comments';
import cleanCSS from 'gulp-cleaner-css';
import rename from 'gulp-rename';

const styles = () => {
  return src(paths.src.css, options.sass)
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('SASS error:', err.message);
        this.emit('end');
      }
    }))
    .pipe(sass().on('error', function(err) {
      console.error('SASS compilation error:', err.message);
      this.emit('end');
    }))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(CSSbeautify(options.CSSbeautify))
    .pipe(dest(paths.build.css, { sourcemaps: '.' }))
    .pipe(cleanCSS())
    .pipe(removeCSSComments())
    .pipe(rename(options.rename))
    .pipe(dest(paths.build.css, { sourcemaps: '.' }))
    .pipe(bs.stream());
};

const stylesPassthrough = () => {
  return src(paths.src.cssPassthrough)
    .pipe(plumber({
      errorHandler: function(err) {
        console.error('CSS error:', err.message);
        this.emit('end');
      }
    }))
    .pipe(dest(paths.build.css))
    .pipe(bs.stream());
};

export { styles, stylesPassthrough };
