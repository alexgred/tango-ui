'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync');


/* Styles
==================== */
gulp.task('dev:less', function() {

  return gulp.src('./src/less/styles.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/css'))
});


/* Clean 
=======================*/
gulp.task('dev:clean', function() {

  return del('./public');
});

gulp.task('prod:clean', function() {
  
  return del('./dist');
});


/* Dev index 
=========================*/
gulp.task('dev:index', function() {

  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'))
});


/* Browser sync 
==============================*/
gulp.task('dev:sync', function() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });

  browserSync.watch('./public/css/*.css').on('change', browserSync.reload);
});


/* Build 
======================*/
gulp.task('dev', gulp.series(
  'dev:clean', 
  'dev:less',
  'dev:sync'
));
