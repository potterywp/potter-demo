'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

module.exports = function(options) {
    gulp.task('build', function() {
        var dist = options.dist;

        runSequence('copy', 'scripts', 'styles', function() {
            gulp.src([dist + '/js/**/*'])
                .pipe($.filter(['*.js', '!**/*.min.js']))
                .pipe($.uglify())
                .pipe($.rename({
                    suffix: '.min'
                }))
                .pipe(gulp.dest(dist + '/js'));

            gulp.src([dist + '/css/**/*'])
                .pipe($.filter(['*.css', '!**/*.min.css']))
                .pipe($.cssmin())
                .pipe($.rename({
                    suffix: '.min'
                }))
                .pipe(gulp.dest(dist + '/css'));
        });
    });
};
