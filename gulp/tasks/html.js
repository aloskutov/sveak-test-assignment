import {paths} from '../config/paths.js';
import {options} from '../config/options.js';
import { bs } from '../config/browser-sync.js';

import gulp from 'gulp';
import pug from 'gulp-pug';
const {src, dest} = gulp;

import spellsData     from '../../data/spells.json' with { type: "json" };
import menuData       from '../../data/menu.json' with { type: "json" };

const html = () => {
    return src(paths.build.pug, { allowEmpty: true })
      .pipe(
        pug({
          ...options.pug,
          locals:{
            menu: menuData,
            spells: spellsData
          }
        })
      )
      .pipe(dest(paths.build.html))
      .pipe(bs.stream());
};

export {html};
