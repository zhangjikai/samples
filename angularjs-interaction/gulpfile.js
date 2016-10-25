var gulp = require("gulp");
var connect = require("gulp-connect");
var less = require("gulp-less");
var browserSync = require('browser-sync');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");

gulp.task("move", function () {
    return gulp.src(
        ['./bower_components/bootstrap/dist/js/**/*bootstrap*js',
            './bower_components/bootstrap/dist/css/**/*bootstrap*css',
            './bower_components/bootstrap/dist/fonts/**/*',
            './bower_components/jquery/dist/**/*jquery*js',
            './bower_components/angular/**/*angular*js',
            './bower_components/angular-route/**/*angular*js',
            './bower_components/angular-animate/**/*angular*js',
            './bower_components/angular-bootstrap/**/*bootstrap*js',
            './bower_components/angular-bootstrap/**/*bootstrap*css',
            './bower_components/angular-sanitize/**/*angular*js',
            './bower_components/angular-translate/**/*angular*js'

        ],
        {
            base: './bower_components'
        }
    ).pipe(gulp.dest('lib'))
});

gulp.task("webServer", function () {
    connect.server({
        port: 80,
        livereload: true
    });
});


/*gulp.task('less', function () {
    gulp.src("app/!**!/!*.less")
        .pipe(plumber({errorHandler: notify.onError("Error: <%=error.message%>")}))
        .pipe(less())
        .pipe(gulp.dest("assets/css"))
        .pipe(connect.reload());
});*/

gulp.task('less', function () {
    gulp.src("app/**/*.less")
        .pipe(plumber({errorHandler: notify.onError("Error: <%=error.message%>")}))
        .pipe(less())
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: '.',
        },
        port: 80
    })
});

//gulp.task("watch", function () {
//    gulp.watch("app/**/*.less", ["less"]);
//    gulp.watch("./**/*.html", connect.reload());
//    gulp.watch("./**/*.css", connect.reload());
//    gulp.watch("app/**/*.js", connect.reload());
//
//});

gulp.task("watch", function () {
    gulp.watch("app/**/*.less", ["less"]);
    gulp.watch("./**/*.html", browserSync.reload);
    gulp.watch("app/**/*.js", browserSync.reload);

});


gulp.task('default', ['browserSync', 'watch', 'less']);