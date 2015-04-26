'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var $ = require('gulp-load-plugins')();

module.exports = function(options) {

    var lessPath = '/less';

    gulp.task('styles', function() {
        var lessOptions = {
            options: [
                'bower_components',
                options.src + lessPath
            ]
        };

        var injectFiles = gulp.src([
            options.src + 'less/**/*.less',
            '!' + options.src + lessPath + '/main.less',
            '!' + options.src + lessPath + '/vendor.less'
        ], {
            read: false
        });

        var injectOptions = {
            transform: function(filePath) {
                filePath = filePath.replace(options.src + lessPath + '/', '');
                return '@import \'' + filePath + '\';';
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        };

        var mainFilter = $.filter('main.less');
        var vendorFilter = $.filter('vendor.less');

        return gulp.src([
                options.src + lessPath + '/main.less',
                options.src + lessPath + '/vendor.less'
            ])
            .pipe(mainFilter)
            .pipe($.inject(injectFiles, injectOptions))
            .pipe(mainFilter.restore())
            .pipe(vendorFilter)
            .pipe(wiredep(options.wiredep))
            .pipe(vendorFilter.restore())
            .pipe($.sourcemaps.init())
            .pipe($.less(lessOptions)).on('error', options.errorHandler('Less'))
            .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(options.dist + '/css'))
            .pipe($.livereload());
    });
};
