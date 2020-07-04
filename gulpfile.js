const gulp = require('gulp');
// const webpack = require('webpack');
const path = require('path');
const util = require('util');
const execFile = util.promisify(require('child_process').exec);
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');
// const responsive = require('gulp-responsive');
const imagemin = require('gulp-imagemin');

const resolve = path.resolve.bind(path, __dirname);

const webpackDevConfig = require('./webpack.dev.js');
const webpackProdConfig = require('./webpack.prod.js'); // this should be the relative path to your Webpack config

/**
 * Run webpack to build assets as specified in webpack config
 */
function assets(env) {
  // if (env === 'production') {
  //   return (files = (cb) => execFile('webpack --config webpack.prod.js'));
  // }
  // return (files = (cb) => execFile('webpack --config webpack.dev.js'));
  if (env === 'production') {
    return gulp
      .src(resolve('./_assets/index.js'))
      .pipe(webpack(webpackProdConfig))
      .pipe(gulp.dest('_site'));
    // return new Promise((resolve, reject) => {
    //   webpack(webpackProdConfig, (err, stats) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     if (stats.hasErrors()) {
    //       return reject(new Error(stats.compilation.errors.join('\n')));
    //     }
    //     // resolve();
    //   });
    // });
  }

  return gulp
    .src(resolve('./_assets/index.js'))
    .pipe(webpack(webpackDevConfig))
    .pipe(gulp.dest('_site'));
  // return new Promise((resolve, reject) => {
  //   webpack(webpackDevConfig, (err, stats) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     if (stats.hasErrors()) {
  //       return reject(new Error(stats.compilation.errors.join('\n')));
  //     }
  //     // resolve();
  //   });
  // });
}

function images(cb) {
  return gulp
    .src('_assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('_site/images/'));
}

/**
 * returns a gulp task to run the ssg build depending on environment specified.
 *
 * @param string env production|development
 */
function ssg(env) {
  if (env === 'production') {
    return (jekyll = (cb) => execFile('bundle exec jekyll build'));
  }
  return (jekyll = (cb) => execFile('bundle exec jekyll build'));
}

/**
 * run dev server
 */
function serve(cb) {
  browserSync.init(
    {
      server: './_site' // this should be the relative path to the location where your SSG builds the HTML
      // port: 8080,
      // host: '0.0.0.0' // bind to 0.0.0.0:8080 to work with Forestry's Instant Previews
    },
    cb
  );
}

function reload(cb) {
  browserSync.reload();
  cb();
}

function watch(cb) {
  return gulp.watch(
    [
      '_assets/**/*',
      // '_data/*',
      'includes/*',
      '_layouts/*',
      '_pages/*',
      '_posts/*'
    ],
    gulp.series(assets, ssg('development'), reload)
    // gulp.series(assets)
  );
}

exports.assets = gulp.series(assets);
exports.images = gulp.series(images);
exports.build = gulp.series(assets, images, ssg('production'));
exports.develop = gulp.series(assets, images, ssg('development'), serve, watch);
