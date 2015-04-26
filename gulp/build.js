'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('build', ['fonts', 'optimize', 'scripts', 'scripts:vendor', 'styles'], function() {
    var dist = options.dist;

    gulp.src(dist + '/js/*.js')
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min' }))
    .pipe(gulp.dest(dist + '/js'));

    gulp.src(dist + '/css/*.css')
    .pipe($.cssmin())
    .pipe($.rename({suffix: '.min' }))
    .pipe(gulp.dest(dist + '/css'));
  });
};
