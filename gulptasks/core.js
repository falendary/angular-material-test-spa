/**
 * Created by labutineg on 12.01.2015.
 *
 */
/*jslint node: true*/
/* global require */

(function () {
    'use strict';

    var gulp = require('gulp');

    var minifyCSS = require('gulp-minify-css');
    var replace = require('gulp-replace');
    var rename = require('gulp-rename');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var less = require('gulp-less');

    gulp.task('Core-min-Angular-JS', function () {

        var pathToJS = [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-sanitize/angular-sanitize.js'
        ];

        return gulp.src(pathToJS)
            .pipe(concat('angular-animate-route-sanitize.min.js'))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest('dist/core/scripts/'));
    });

    gulp.task('Core-min-Angular-material-CSS', function () {

        var pathToCSS = [
            'node_modules/angular-material/angular-material.css',
            'node_modules/angular-material-icons/angular-material-icons.css',
            'node_modules/angular-material-data-table/dist/md-data-table.css'
        ];

        return gulp.src(pathToCSS)
            .pipe(concat('angular-material.css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifyCSS({keepBreaks: false}))
            .pipe(gulp.dest('dist/core/content/css/'));
    });

    gulp.task('Core-min-Angular-material-JS', function () {

        var pathToJS = [
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material-icons/angular-material-icons.js',
            'node_modules/angular-material-data-table/dist/md-data-table.js'
        ];

        return gulp.src(pathToJS)
            .pipe(concat('angular-material.min.js'))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest('dist/core/scripts/'));
    });

    gulp.task('Core-min-jQuery-JS', function () {

        var pathToJS = [
            'node_modules/jquery/dist/jquery.js'
        ];

        return gulp.src(pathToJS)
            .pipe(concat('jquery.js'))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dist/core/scripts/'));
    });

    gulp.task('Core-min-libs-JS', function () {

        var pathToJS = [
            'src/core/scripts/table-drag.js'
        ];

        return gulp.src(pathToJS)
            .pipe(concat('libs.js'))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dist/core/scripts/'));
    });

    gulp.task('Core-min-Angular-UI-JS', function () {

        var pathToJS = [
            'node_modules/angular-ui-router/release/angular-ui-router.js'
        ];

        return gulp.src(pathToJS)
            .pipe(concat('angular-ui.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/core/scripts/'));
    });

    gulp.task('Core-min-CoreJS-JS', function () {

        var pathToJS = [
            'node_modules/core-js/client/core.js'
        ];

        return gulp.src(pathToJS)
            .pipe(concat('corejs.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/core/scripts/'));
    });

    gulp.task('Core-min-All', [
        'Core-min-Angular-JS',
        'Core-min-Angular-UI-JS',
        'Core-min-jQuery-JS',
        'Core-min-CoreJS-JS',
        'Core-min-Angular-material-CSS',
        'Core-min-Angular-material-JS',
        'Core-min-libs-JS'
    ]);

}());