import { paths } from '../config/paths.js';
import { options } from '../config/options.js';
import { bs } from '../config/browser-sync.js';

import gulp from 'gulp';
const { src, dest } = gulp;

import pug from 'gulp-pug';
import plumber from 'gulp-plumber';

import spellsData from '../../data/spells.json' with { type: "json" };
import menuData from '../../data/menu.json' with { type: "json" };

const html = () => {
  return src(paths.build.pug, { allowEmpty: true })
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.error('PUG error:', err.message);
          this.emit('end');
        },
      })
    )
    .pipe(
      pug({
        ...options.pug,
        locals: {
          isProd: options.isProd,
          asset: (name, ext) => {
            const suffix = options.isProd ? '.min' : '';
            const folder = ext === 'css' ? 'css' : ext === 'js' ? 'js' : ext;
            return `/assets/${folder}/${name}${suffix}.${ext}`;
          },
          menu: menuData,
          spells: spellsData
        }
      })
    )
    .pipe(dest(paths.build.html))
    .pipe(bs.stream());
};

export { html };
