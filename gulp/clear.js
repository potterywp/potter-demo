'use strict';

var gulp = require('gulp');
var del = require('del');

module.exports = function(options) {
  gulp.task('clear:fonts', function (cb) {
    del(options.dist + '/fonts/**', cb);
  });

  gulp.task('clear:images', function (cb) {
    del(options.dist + '/img/**', cb);
  });

  gulp.task('clear', ['clear:fonts', 'clear:images']);
};
