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
  .pipe(dest('./dist'));
};

// const scripts = () => {
//   return src([
//     './src/vendor/swiper.js',
//     'src/*.js'
//   ])
//     .pipe(concat('app.js'))
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//       presets: ['@babel/env']
//     }))
//     .pipe(uglify().on('error', notify.onError()))
//     .pipe(sourcemaps.write())
//     .pipe(dest('dist'))
//     .pipe(browserSync.stream())
// };

const html = () => {
  return src('./src/*.html')
    .pipe(dest('./dist'));
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
};

const resources = () => {
  return src('./src/public/**')
    .pipe(dest('./dist/public'))
};

const vendorJS = () => {
  const modules = [
    './node_modules/swiper/swiper-bundle.min.js',
    './node_modules/swiper/swiper-bundle.min.js.map',
  ];

  return src(modules)
    .pipe(dest('./dist/public/js'));
};

const vendorCSS = () => {
  const modules = [
    'node_modules/swiper/swiper-bundle.min.css',
  ];

  return src(modules)
    .pipe(dest('./dist/public/css'));
};

watch('./src/styles/*.scss', css);
watch('./src/public', resources);
watch('./src/*.html', html);

exports.default = series(resources, vendorCSS, css, html, vendorJS, watchFiles);
