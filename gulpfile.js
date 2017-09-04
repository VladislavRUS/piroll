const gulp = require('gulp'),
      config = require('./gulp/config.js'),
      less = require('gulp-less'),
      autoprefixer = require('gulp-autoprefixer'),
      concat = require('gulp-concat'),
      minify = require('gulp-minify'),
      bsync = require('browser-sync').create();


gulp.task('less', () => {
    return gulp.src(config.less.src)
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(gulp.dest(config.less.dest))
    .pipe(bsync.stream());
});

gulp.task('bsync', () => {
    bsync.init({
        server: {
            baseDir: './'
        }
    })
});

gulp.task('default', ['less', 'bsync'], () => {
    gulp.watch(config.less.watch, ['less']);
    gulp.watch('./*.html', bsync.reload);
});