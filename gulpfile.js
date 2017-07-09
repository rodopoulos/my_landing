var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var prefix = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var minify = require('gulp-minify');
var nano = require('gulp-cssnano');
var concat = require('gulp-concat');
var jsdep = require('gulp-resolve-dependencies');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

var assets = {
  scss: './assets/scss/',
  js: './assets/js/',
  imgs: './assets/img/',
};

var build = {
  css: './build/css/',
  js: './build/js/',
  imgs: './build/img/'
};






gulp.task('compile-sass', function() {
  return gulp.src(assets.scss + 'main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('main.css'))
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(build.css));
});




gulp.task('css', ['compile-sass'], function() {
  return gulp.src(build.css + 'main.css')
    .pipe(nano())
    .pipe(gulp.dest(build.css))
    .pipe(reload({stream: true}));
});




gulp.task('parse-js', function() {
  return gulp.src(assets.js.site + '*.js')
    .pipe(jsdep({
      pattern: /\* @requires [\s-]*(.*\.js)/g
    }))
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(build.js));
});

gulp.task('parse-js', function() {
  return gulp.src(assets.js + '*.js')
    .pipe(jsdep({
      pattern: /\* @requires [\s-]*(.*\.js)/g
    }))
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest(build.js));
});

gulp.task('js', function() {
  return gulp.src(assets.js.site + '*.js')
    .pipe(jsdep({
      pattern: /\* @requires [\s-]*(.*\.js)/g
    }))
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(build.js));
});


gulp.task('img', function() {
  return gulp.src(assets.imgs + '*.*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(build.imgs));
});




gulp.task('browser-sync', function () {
	browserSync.init({
		proxy: "localhost/my_landing",
		notify: false
	});

  gulp.watch(assets.scss + '**/*.scss', ['compile-sass', 'css']).on('change', browserSync.reload);;
  gulp.watch(assets.js.root + '**/*.js', ['js']).on('change', browserSync.reload);;
	// gulp.watch('**/*.php', ['php']).on('change', browserSync.reload);
});




gulp.task('default', ['compile-sass', 'parse-js', 'img', 'browser-sync']);

gulp.task('build', ['css', 'js', 'img']);
