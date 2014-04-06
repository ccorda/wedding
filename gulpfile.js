var gulp         = require("gulp");
var util         = require("gulp-util");
var sass         = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify       = require("gulp-uglify");
var minifycss    = require("gulp-minify-css");
var usemin       = require("gulp-usemin");
var rev          = require("gulp-rev");
var clean        = require("gulp-clean");
var inject       = require("gulp-inject");
var swig         = require('gulp-swig');
var marked       = require('swig-marked');
var livereload   = require('gulp-livereload');

// Load plugins
var $ = require('gulp-load-plugins')();

var config = {
    timber: 'public',
    assets: 'assets',
    templates: 'templates',
    dev: 'dev',
    dist: 'public'
}

var opts = {
    data: {
        headline: "Welcome"
    },
    defaults: {
        cache: false
    },
    setup: function(swig) {
        marked.useTag(swig, 'markdown');
    }
};

gulp.task('clean', function() {
    return gulp.src( config.dist, {read: false})
        .pipe($.clean());
});

gulp.task('styles', function() {
    return gulp.src( config.assets + '/scss/**/*.scss' )
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded',
            sourceComments: 'map'
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest( config.dev + '/css' ))
        .pipe(minifycss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest( config.dist + '/css'));
});

gulp.task('scripts', function() {
    return gulp.src( config.timber + '/views/layout.twig' )
        .pipe(usemin({
            assetsDir: 'site-wp/wordpress',
            js: [ uglify() ]
        }))
        .pipe(gulp.dest( config.dist ));
});

// Images
gulp.task('images', function () {
    return gulp.src( config.assets + '/img/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest( config.dist + '/img'))
        .pipe($.size());
});



// Static Site
gulp.task('templates', function() {
    gulp.src( config.templates + '/*.swig')
    .pipe(swig(opts))
    .pipe(gulp.dest( config.dev ))
    .pipe(gulp.dest( config.dist ))
});

gulp.task('connectDev', function () {
    $.connect.server({
        root: [config.dev],
        port: 9001,
        livereload: true
    });
});

gulp.task('connectDist', function () {
    $.connect.server({
        root: [config.dist],
        port: 9000,
        livereload: true
    });
});


gulp.task('watch', function() {
    gulp.watch( config.dist + '/**/*', function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });
    gulp.watch( config.assets + '/**/*.js', ['scripts']);
    gulp.watch( config.assets + '/scss/**/*.scss', ['styles']);
    gulp.watch( config.assets + '/img/**/*', ['images']);
    gulp.watch( config.templates + '/**/*.swig', ['templates']);
});

// define tasks
gulp.task('default', [
    'connectDist',
    'clean',
    'styles',
    'images',
    // 'scripts'
    'templates',
    'watch'
]);

gulp.task('build', [
    'styles',
    'images',
    'templates'
]);
