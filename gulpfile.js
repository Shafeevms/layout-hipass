const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const css = () => {
  return src('./src/styles/**/*.scss')
  .pipe(concat('styles.scss'))
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(dest('dist'));
};

const html = () => {
  return src('src/*.html')
    .pipe(dest('dist'));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
};

const resources = () => {
  return src('./src/public/**')
    .pipe(dest('./dist/public'))
};

watch('./src/styles/*.scss', css);
watch('./src/public', resources);
watch('./src/*html');

exports.default = series(resources, css, html, watchFiles);
