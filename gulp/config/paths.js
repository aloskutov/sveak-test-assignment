const srcFolder = './src/';
const buildFolder = './build/';

const paths = {
  build: {
    html: buildFolder,
    js: buildFolder + 'assets/js',
    css: buildFolder + 'assets/css',
    images: buildFolder + 'assets/images',
    json: buildFolder + 'json',
    fonts: buildFolder + 'assets/fonts',
  },
  src: {
    pug: [
      srcFolder + 'pug/index.pug',
      srcFolder + 'pug/pages/*.pug'
    ],
    data: srcFolder + 'data/**/*.json',
    js: [srcFolder + 'assets/js/**/*.js'],
    jsEntry: srcFolder + 'assets/js/main.js',
    css: [
      srcFolder + 'assets/sass/**/*.{scss,sass}',
    ],
    cssPassthrough: [srcFolder + 'assets/css/**/*.css'],
    images: srcFolder + 'assets/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}',
    icoPassthrough: [srcFolder + 'favicon.ico'],
    json: srcFolder + 'json/**/*.json',
    fonts: srcFolder + 'assets/fonts/**/*.{eot,svg,ttf,woff,woff2}',
  },
  watch: {
    html: [srcFolder + 'pug/**/*.pug', srcFolder + '*.html', srcFolder + 'json/**/*.json'],
    js: srcFolder + 'assets/js/**/*.js',
    sass: srcFolder + 'assets/sass/**/*.{scss,sass}',
    css: srcFolder + 'assets/css/**/*.css',
    images: srcFolder + 'assets/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}',
  },
  clean: buildFolder,
};

export {paths, srcFolder, buildFolder};
