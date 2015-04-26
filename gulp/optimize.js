'use strict';

var gulp = require('gulp');
var pngcrush = require('imagemin-pngcrush');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('optimize', ['clear:images'], function() {

    var srcPath = options.src + '/img';
    var distPath = options.dist + '/img';

    return gulp.src(srcPath + '/**')
      .pipe($.imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngcrush()]
      }))
      .pipe(gulp.dest(distPath));
  });
};
