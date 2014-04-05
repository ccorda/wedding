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
    }
};

gulp.task('clean', function() {
    gulp.src( config.dist, {read: false})
        .pipe(clean());
});

gulp.task('styles', function() {
    return gulp.src( config.assets + '/scss/**/*.scss' )
        .pipe(sass({
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
    .pipe(gulp.dest( config.dist ))
});

gulp.task('images', function() {
    return gulp.src( config.assets + '/img/**' )
    .pipe(gulp.dest( config.dist + '/assets/img' ))
});

gulp.task('templates', function() {
    gulp.src( config.templates + '/*.swig')
    .pipe(swig(opts))
    .pipe(gulp.dest( config.dev ))
    .pipe(gulp.dest( config.dist ))
});

gulp.task('watch', function() {
    gulp.watch( config.assets + '/**/*.js', ['scripts']);
    gulp.watch( config.assets + '/scss/**/*.scss', ['styles']);
});

// define tasks
gulp.task('default', [
    'clean',
    'styles',
    // 'scripts'
    'templates'
]);
