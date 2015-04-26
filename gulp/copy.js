'use strict';

var gulp = require('gulp');
var pngcrush = require('imagemin-pngcrush');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  var distPath = options.dist;
  var srcPath = options.src;


  gulp.task('copy:fonts', ['clear:fonts'], function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(distPath + '/fonts/'));
  });

  gulp.task('copy:scripts',['clear:scripts'] , function () {

    var filter = $.filter(options.scripts.copyFilter);

    return gulp.src(srcPath + '/js/**/*')
      .pipe(filter)
      .pipe(gulp.dest(distPath + '/js/'));
  });

  gulp.task('copy:images', ['clear:images'], function() {

    var srcPath = options.src + '/img/**/**';
    var distPath = options.dist + '/img';

    return gulp.src(srcPath)
      .pipe($.imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngcrush()]
      }))
      .pipe(gulp.dest(distPath));
  });

  gulp.task('copy', ['copy:images', 'copy:fonts', 'copy:scripts']);
};
