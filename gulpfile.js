'use strict';

const { src, dest, watch, parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const browsersync = require('browser-sync');
const connect = require('gulp-connect-php');


// Sass Task
function scssTask() {
    return src('./assets/sass/*.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(postcss([cssnano()]))
        .pipe(dest('./assets/css'))
};

// JavaScript Task
function jsTask() {
    return src(
            './assets/disc/js/main.js', { sourcemaps: true })
        .pipe(terser())
        .pipe(dest('./assets/js', { sourcemaps: '.' }));
}

//Start Server
function browsersyncServe() {

    return connect.server({
        router: './kirby/router.php',
        port: 8000,
        keepalive: true,
        debug: true
    }, function() {
        browsersync({
            proxy: '127.0.0.1:8000',
            notify: false,
        })
    });
}

//Reload Browser
function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch(['./site/**/*.php', './site/**/*.yml'], browsersyncReload);
    watch(['assets/sass/**/*.scss'], series(scssTask, browsersyncReload));
    watch(['assets/sass/**/*.js'], series(jsTask, browsersyncReload));
}

exports.default = parallel(
    scssTask,
    jsTask,
    browsersyncServe,
    watchTask
);
