import { paths } from '../config/paths.js';
import { bs } from '../config/browser-sync.js';

import gulp from 'gulp';
const { src, dest } = gulp;

import plumber from 'gulp-plumber';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';

const images = () => {
  return src(paths.src.images, { encoding: false })
    .pipe(plumber())
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 85, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          plugins: [{ name: 'cleanupIDs', params: { remove: false } }],
        }),
      ])
    )
    .pipe(dest(paths.build.images))
    .pipe(bs.stream());
};

export { images };
