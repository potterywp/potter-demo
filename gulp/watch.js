'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('watch', ['styles', 'optimize', 'scripts:watch'], function() {
    $.livereload.listen();
    gulp.watch(options.src + '/img/*', ['optimize']);
    gulp.watch(['./bower.jon', './package.json'], ['scripts:vendor']);
    gulp.watch(options.src + '/less/**/*.less', ['styles']);
  });
};
