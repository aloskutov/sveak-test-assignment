const srcFolder = './src/';
const buildFolder = './build/';

const paths = {
  build: {
    html: buildFolder,
    js: buildFolder + 'assets/js',
    css: buildFolder + 'assets/css',
    images: buildFolder + 'assets/images',
    fonts: buildFolder + 'assets/fonts',
    favicons: buildFolder,
  },
  src: {
    pug: [
      srcFolder + 'pug/pages/*.pug'
    ],
    js: [srcFolder + 'assets/js/**/*.js'],
    jsEntry: srcFolder + 'assets/js/main.js',
    css: [
      srcFolder + 'assets/sass/*.{scss,sass}',
    ],
    cssPassthrough: [srcFolder + 'assets/css/**/*.css'],
    images: srcFolder + 'assets/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}',
    fonts: srcFolder + 'assets/fonts/**/*.{eot,svg,ttf,woff,woff2}',
    favicons: [
      srcFolder + 'favicon.ico',
      srcFolder + 'favicon.svg',
      srcFolder + 'apple-touch-icon.png',
    ],
  },
  watch: {
    html: srcFolder + 'pug/**/*.pug',
    js: srcFolder + 'assets/js/**/*.js',
    sass: srcFolder + 'assets/sass/**/*.{scss,sass}',
    css: srcFolder + 'assets/css/**/*.css',
    images: srcFolder + 'assets/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}',
    favicons: [srcFolder + 'favicon.{ico,svg}', srcFolder + 'apple-touch-icon.png'],
    fonts: srcFolder + 'assets/fonts/**/*.{eot,svg,ttf,woff,woff2}',
  },
  clean: buildFolder,
};

export {paths, srcFolder, buildFolder};
