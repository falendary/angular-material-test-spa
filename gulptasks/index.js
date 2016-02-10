/**
 * Created by s.zhitenev on 22.07.2015.
 *
 */
/*jslint node: true*/
/* global require */

(function () {
    'use strict';

    // Include gulp
    var gulp = require('gulp');

    // main
    var livereload = require('gulp-livereload');
    var plumber = require('gulp-plumber');
    var rename = require('gulp-rename');
    var preprocess = require('gulp-preprocess');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');

    // css, less
    var autoprefixer = require('gulp-autoprefixer');
    var minifyCSS = require('gulp-minify-css');
    var less = require('gulp-less');
    // js
    var browserify = require('browserify');
    var jshint = require('gulp-jshint');
    var jslint = require('gulp-jslint-simple');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');

    // html
    var htmlmin = require('gulp-htmlmin');
    var ngHtml2Js = require('gulp-ng-html2js');

    var appName = 'index';

    gulp.task('index-min-IMG', function () {

        var pathToImg = [
            'src/' + appName + '/content/**/*.{jpg,gif,png}'
        ];

        return gulp.src(pathToImg)
            .pipe(gulp.dest('dist/' + appName + '/content/'));
    });

    gulp.task('index-min-Fonts', function () {

        var pathToFonts = [
            'src/' + appName + '/content/fonts/*'
        ];

        return gulp.src(pathToFonts)
            .pipe(gulp.dest('dist/' + appName + '/content/fonts/*'));
    });

    gulp.task('index-min-LESS',  function () {

        var pathToLESS = [
            'src/' + appName + '/content/less/imports.less'
        ];

        return gulp.src(pathToLESS)
            .pipe(less())
            .on('error', function (error) {
                console.error('\nError on LESS compilation: \n', error.toString());
                this.emit('end');
            })
            .pipe(autoprefixer({
                browsers: ['last 10 versions'],
                cascade: false
            }))
            .pipe(minifyCSS({keepBreaks: false, keepSpecialComments: false}))
            .pipe(rename({basename: 'main', suffix: '.min', extname: '.css'}))
            .pipe(gulp.dest('dist/' + appName + '/content/css/'));
    });

    gulp.task('index-min-JS', function () {

        var pathToJSApp =
            ['src/' + appName + '/scripts/main.js',
                'src/' + appName + '/scripts/app/templates.min.js'];

        return browserify(pathToJSApp)
            .bundle()
            .on('error', function (err) {
                console.error('Error in Browserify: \n', err.message);
                this.emit('end');
            })
            .pipe(plumber())
            .pipe(source('bundled.js'))
            .pipe(buffer())
            .pipe(preprocess())
            .pipe(uglify())
            .pipe(rename({basename: 'main', suffix: '.min'}))
            .on('error', function (error) {
                console.error('\nError on JS minification: \n', error.toString());
                this.emit('end');
            })
            .pipe(gulp.dest('dist/' + appName + '/scripts/'))
            .pipe(livereload());
    });

    gulp.task('index-min-HTML', function () {

        var pathToHTML = [
            'src/index.html'
        ];

        return gulp.src(pathToHTML)
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('index-HTML-to-JS', function () {
        var pathToTemplates = [
            'src/' + appName + '/scripts/app/views/*.html'
        ];
        return gulp.src(pathToTemplates)
            .pipe(htmlmin({collapseWhitespace: true}))
            .on('error', function (error) {
                console.error('\nError on HTML minification: \n', error.toString());
                this.emit('end');
            })
            .pipe(ngHtml2Js({
                moduleName: 'app'
            }))
            .pipe(concat('templates.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('src/' + appName + '/scripts/app/'));
    });

    gulp.task('index-min-All', ['index-HTML-to-JS', 'index-min-LESS', 'index-min-JS', 'index-min-HTML', 'index-min-IMG']);

    // Watchers
    gulp.task('index-watch-min', ['index-min-All'], function () {
        livereload.listen();
        gulp.watch('src/**/*.{css,less}', ['index-min-LESS']);
        gulp.watch('src/**/*.js', ['index-min-JS']);
        gulp.watch('src/**/*.html', ['index-HTML-to-JS', 'index-min-HTML']);
    });

}());