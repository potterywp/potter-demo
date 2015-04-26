'use strict';

var gulp = require('gulp');
var BowerWebpackPlugin = require("bower-webpack-plugin");
var vendor = require('gulp-concat-vendor');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
  function webpack(watch, callback) {
    var webpackOptions = {
      watch: watch,
      module: {
        preLoaders: [{
          test: /\.js$/,
          exclude: [/node_modules/, /bower_components/],
          loader: 'jshint-loader'
        }],
        loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'traceur-loader'
        }]
      },
      plugins: [new BowerWebpackPlugin()],
      output: {
        filename: 'main.js'
      }
    };

    if (watch) {
      webpackOptions.devtool = 'inline-source-map';
    }

    var webpackChangeHandler = function(err, stats) {
      if (err) {
        options.errorHandler('Webpack')(err);
      }

      $.util.log(stats.toString({
        colors: $.util.colors.supportsColor,
        chunks: false,
        hash: false,
        version: false
      }));

      if (watch) {
        watch = false;
        callback();
      }
    };

    return gulp.src(options.src + '/js/main.js')
      .pipe($.webpack(webpackOptions, null, webpackChangeHandler))
      .pipe(gulp.dest(options.dist + '/js'));
  }

  gulp.task('scripts', function() {
    return webpack(false);
  });

  gulp.task('scripts:vendor', function() {
    var jsFilter = $.filter('*.js');
    var files = $.mainBowerFiles();
    return gulp.src(files)
      .pipe(jsFilter)
      .pipe($.concat('vendor.js'))
      .pipe(gulp.dest(options.dist + '/js'));
  });

  gulp.task('scripts:watch', ['scripts', 'scripts:vendor'], function(callback) {
    return webpack(true, callback);
  });
};
