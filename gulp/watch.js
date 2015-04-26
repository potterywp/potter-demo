'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('watch', ['styles', 'copy:images', 'scripts:watch'], function() {
    $.livereload.listen();
    gulp.watch(options.src + '/img/**/**', ['copy:images']);
    gulp.watch(['./bower.jon', './package.json'], ['scripts:vendor']);
    gulp.watch(options.src + '/less/**/*.less', ['styles']);
  });
};
