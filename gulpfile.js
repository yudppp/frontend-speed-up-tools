var gulp     = require('gulp');
var concat   = require('gulp-concat');
var sequence = require('run-sequence').use(gulp);

// var LIB_JS_FILES = [
//   'bower_components/jquery/dist/jquery.min.js',
// ];
//
// var APP_JS_FILES = [
//   'src/js/app.js'
// ];

var LIB_CSS_FILES = [
//   'bower_components/normalize.css/normalize.css',
];

var APP_CSS_FILES = [
  'src/css/app.css',
  'src/css/sprite.css'
];

var APP_IMG_FILES = [
  'src/img/app/*'
];

var SPRITE_IMG_FILES = [
  'src/img/sprite/*'
];

gulp.task('watch', function () {

  //gulp.watch(APP_JS_FILES, function () {
  //  gulp.start('js:app');
  //});

  gulp.watch(APP_CSS_FILES, function () {
    gulp.start('css:app');
  });
});

gulp.task('build', function () {
  // sequence('js', 'css');
  sequence('css');
});

// gulp.task('js', function () {
//   gulp.start('js:lib', 'js:app');
// });

gulp.task('css', function () {
  gulp.start('css:lib', 'css:app');
});

gulp.task('img', function () {
  gulp.start('img:app', 'img:sprite')
});

// gulp.task('js:lib', function () {
//
//   gulp.src(LIB_JS_FILES)
//     .pipe(concat('lib.min.js'))
//     .pipe(gulp.dest('dist/js'));
// });
//
// gulp.task('js:app', function () {
//
//   var uglify = require('gulp-uglify');
//
//   gulp.src(APP_JS_FILES)
//     .pipe(concat('app.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'));
// });

gulp.task('css:lib', function () {

  var csscomb = require('gulp-csscomb');
  var csso    = require('gulp-csso');

  gulp.src(LIB_CSS_FILES)
    .pipe(concat('lib.min.css'))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('css:app', function () {

  var csscomb = require('gulp-csscomb');
  var csso    = require('gulp-csso');

  gulp.src(APP_CSS_FILES)
    .pipe(concat('app.min.css'))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('img:app', function () {
  var imagemin = require('gulp-imagemin');
  var webp = require('gulp-webp');
  gulp.src(APP_IMG_FILES)
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/app/'))
    .pipe(webp())  // options: https://github.com/imagemin/imagemin-webp#imageminwebpoptions
    .pipe(gulp.dest('dist/img/app/'));
});

gulp.task('img:sprite', function () {
  var imagemin = require('gulp-imagemin');
  var spritesmith = require('gulp.spritesmith');
  var spriteData = gulp.src(SPRITE_IMG_FILES)
    .pipe(imagemin())
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css',
      imgPath: 'dist/img/sprite',
      cssFormat: 'css',
      cssVarMap: function (sprite) {
        sprite.name = 'sprite-' + sprite.name;
      }
    }))
  spriteData.img.pipe(gulp.dest('dist/img/sprite/'));
  return spriteData.css
    .pipe(gulp.dest('dist/css/'))
    .pipe(gulp.dest('src/css/'));
});
