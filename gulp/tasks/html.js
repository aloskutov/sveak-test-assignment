import { paths } from '../config/paths.js';
import { options } from '../config/options.js';
import { bs } from '../config/browser-sync.js';

import gulp from 'gulp';
const { src, dest } = gulp;

import pug from 'gulp-pug';
import plumber from 'gulp-plumber';

import { createAssets } from '../utils/assets.js';

import spellsData from  '../../src/data/spells.json' with { type: "json" };
import menuData from    '../../src/data/menu.json' with { type: "json" };

const html = () => {
  return src(paths.src.pug, { allowEmpty: true })
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
          asset: createAssets({ isProd: options.isProd, basePath: options.publicPath }),
          menu: menuData,
          spells: spellsData
        }
      })
    )
    .pipe(dest(paths.build.html))
    .pipe(bs.reload({ stream: true }));
};

export { html };
