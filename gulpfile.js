(function () {

    'use strict';
    var gulp = require('gulp');

    var requireDir = require('require-dir');
    var dir = requireDir('./gulptasks');

    gulp.task('release', ['Terminal-min-All']);

    gulp.task('default', ['release']);

}()); 