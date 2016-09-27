/**
 * Created by zhangjk on 2016/9/27.
 */
/*
var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var plumber = require('gulp-plumber');

gulp.task('bower-files', function () {
    return gulp.src(mainBowerFiles())
        .pipe(plumber())
        .pipe(gulp.dest("lib"))
});

gulp.task('bower', function() {
    return bower('bower_components')
        .pipe(gulp.dest('lib/'))
});*/


/*
var gulp = require('gulp');

// define plug-ins
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');

// Define paths variables
var dest_path =  './lib';
// grab libraries files from bower_components, minify and push in /public
gulp.task('publish-components', function() {

    var jsFilter = gulpFilter('*.js', {restore:true});
    var cssFilter = gulpFilter('*.css', {restore: true});
    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'], {restore:true});

    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(gulp.dest(dest_path + '/js/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/js/'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(minifycss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest(dest_path + '/css'))
        .pipe(cssFilter.restore)
        .pipe(fontFilter)
        .pipe(flatten())
        .pipe(gulp.dest(dest_path + '/fonts'));
});*/


//// Include Gulp
//var gulp = require('gulp');
//
//// Include plugins
//var plugins = require("gulp-load-plugins")({
//    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
//    replaceString: /\bgulp[\-.]/
//});
//
//// Define default destination folder
//var dest = 'www/public/';
//
//gulp.task('js', function() {
//
//    var jsFiles = ['src/js/*'];
//
//    gulp.src(plugins.mainBowerFiles().concat(jsFiles))
//        .pipe(plugins.filter('*.js'))
//        .pipe(plugins.concat('main.js'))
//        .pipe(plugins.uglify())
//        .pipe(gulp.dest(dest + 'js'));
//
//});

/*
var gulp = require('gulp');
var gbowerTask = require('gulp-bower-task');

gulp.task('default',function(){
    gulp.src('bower.json')
        .pipe(gbowerTask())
        .pipe(gulp.dest('./output/'));
})*/

//
//var gulp = require('gulp');
//var mainBowerFiles = require('main-bower-files');
//var plumber = require('gulp-plumber');
//
//gulp.task('bower-files', function () {
//    return gulp.src(mainBowerFiles())
//        .pipe(plumber())
//        .pipe(gulp.dest("lib"))
//});

//var gulp = require("gulp");
//var gulpBowerFiles = require("gulp-bower-files");
//gulp.task("bower-files", function() {
//    gulpBowerFiles().pipe(gulp.dest("./lib"));
//})

var gulp = require("gulp");

gulp.task("move", function() {
    return gulp.src(
        ['./bower_components/bootstrap/dist/js/**/*bootstrap*js',
            './bower_components/bootstrap/dist/css/**/*bootstrap*css',
            './bower_components/bootstrap/dist/fonts/**/*',
            './bower_components/jquery/dist/**/**jquery*js'
        ],
        {
            base:'./bower_components'
        }
    ).pipe(gulp.dest('lib'))
});
