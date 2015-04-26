'use strict';

var gulp = require('gulp');
var del = require('del');

module.exports = function(options) {
  gulp.task('clear:fonts', function (cb) {
    return del(options.dist + '/fonts/**/**', cb);
  });

  gulp.task('clear:images', function (cb) {
    return del(options.dist + '/img/**/**', cb);
  });

  gulp.task('clear:scripts', function (cb) {
    return del(options.dist + '/js/**/**', cb);
  });

  gulp.task('clear:styles', function (cb) {
    return del(options.dist + '/css/**/**', cb);
  });

  gulp.task('clear', ['clear:fonts', 'clear:images', 'clear:styles', 'clear:scripts']);
};
