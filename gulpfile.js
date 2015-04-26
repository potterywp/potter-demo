'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

var options = {
  src: './assets/src',
  dist: './assets/dist',
  tmp: '.tmp',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    exclude: [/bootstrap\.css/, /bootstrap\.less/, /jquery\.js/]
  },
  scripts: {
    filter: ['*.js', '!jquery**.js'],
    copyFilter: ['**', '!main.js']
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['build']);
gulp.task('w', ['watch']);
