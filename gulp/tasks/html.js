import {paths} from '../config/paths.js';
//import {options} from '../config/options.js';

import gulp from 'gulp';
import pug from 'gulp-pug';
const {src, dest} = gulp;

import spellsData     from '../../data/spells.json' with { type: "json" };
import menuData       from '../../data/menu.json' with { type: "json" };
/* import booksData      from '../../data/books.json' with { type: "json" };
import charactersData from '../../data/characters.json' with { type: "json" };
import housesData     from '../../data/houses.json' with { type: "json" }; */

import browserSync from 'browser-sync';

const html = () => {
    return src(paths.build.pug, { allowEmpty: true })
      .pipe(
        pug({
          pretty: true,
          locals:{
            menu: menuData,
/*             characters: charactersData,
            houses: housesData,
            books: booksData, */
            spells: spellsData
          }
        })
      )
      .pipe(dest(paths.build.html))
      .pipe(browserSync.stream());
};

export {html};
