'use strict';

var gulp = require('gulp');
var pngcrush = require('imagemin-pngcrush');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('optimize', function() {
    return gulp.src(options.src + '/img/*')
      .pipe($.imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngcrush()]
      }))
      .pipe(gulp.dest(options.dist + '/img/'));
  });
};
