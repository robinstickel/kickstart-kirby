var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require("gulp-rename"),
    imagemin = require("gulp-imagemin"),
    autoprefixer = require('gulp-autoprefixer'),
    php = require('gulp-connect-php'),
    browserSync = require('browser-sync').create();


// Variables
// -----------------------------------
var reload  = browserSync.reload;
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%']};


// SASS compile, minify, autoprefix, sourcemap and rename
// -----------------------------------
gulp.task('styles', function() {
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(reload({stream: true}));
});


// Images | Compress images
// -----------------------------------
gulp.task('imagemin', function() {
    gulp.src('./assets/images/*')
        .pipe(imagemin({progressive: true, optimization: 8,}))
        .pipe(gulp.dest('assets/images'));
});


// Start PHP server
// -----------------------------------
gulp.task('php', function() {
    php.server({ base: './', port: 8010, keepalive: true});
});


// Load BrowserSync
// -----------------------------------
gulp.task('browser-sync', ['php'], function() {
    browserSync.init({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false,
        snippetOptions: {
          ignorePaths: ["./panel/**"]
        },
    });
});


// Serve | Launches Dev Environment
// (use this to work on your project)
// -----------------------------------
gulp.task('serve', ['browser-sync'], function() {
    gulp.watch(['./site/**/*.php', './site/**/*.yml']).on('change', reload);
    gulp.watch('./assets/sass/**/*.scss', ['styles']);
});

// Build | Optimizes everything for deployment
// (use this to deploy your project)
// -----------------------------------
gulp.task('build', ['styles', 'imagemin']);


// Default Gulp Task | (change this to whatever you like)
// -----------------------------------
gulp.task('default', ['serve']);
