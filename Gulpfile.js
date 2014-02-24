var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    karma = require('gulp-karma'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    serve = require('gulp-serve'),
    jade = require('gulp-jade'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    inject = require('gulp-inject'),
    protractor = require('gulp-protractor').protractor,
    webdriver = require("gulp-protractor").webdriver;


gulp.task('webdriver', webdriver);

var publicFolder = 'public';

var src = {
    main: 'src/js/app.js',
    js: 'src/js/**/*.js',
    css: 'src/css/**/*.css',
    img: 'src/img/**/*',
    templates: 'src/templates/**/*.jade'
}

var dest = {
    css: 'public/css',
    img: 'public/img',
    js: 'public/js',
    views: 'public/views'
}

gulp.task('js', function() {
    return gulp.src(src.main, {read: false})
        .pipe(browserify({}))
        .pipe(gulp.dest(dest.js));
});

gulp.task('templates', function() {
    return gulp.src(src.templates)
        .pipe(jade())

        .pipe(gulp.dest(publicFolder));
});

gulp.task('stylesheets', function() {
    return gulp.src(src.css)
        .pipe(concat('main.css'))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(dest.css));
});

gulp.task('images', function() {
    return gulp.src(src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(dest.img));
});

gulp.task('build', ['js', 'templates', 'stylesheets', 'images'])

gulp.task('clean', function() {
    return gulp.src(publicFolder)
        .pipe(clean({read: false}));
});

gulp.task('serve', serve('public'));

gulp.task('minify', ['build'], function() {
    return gulp.src('public/js/app.js')
        .pipe(clean())
        .pipe(ngmin())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('public/js/'))
})

gulp.task('test:unit', function() {
    return gulp.src(['test/unit/**/*.js'])
        .pipe(karma({
            configFile: 'test/karma.conf.js',
            action: 'run'
        }));
});

gulp.task('test:e2e', ['serve'], function() {
    return gulp.src(['test/e2e/**/*_spec.js'])
        .pipe(protractor({
            configFile: 'test/protractor.conf.js'
        }))
        .on('end', function() { process.exit(0) })
        .on('error', function(e) { throw new Error(e) })
})

gulp.task('watch', ['webdriver', 'serve'], function() {
    var server = livereload(lr().listen());
    gulp.watch('public/**').on('change', function(file) {
        server.changed(file.path)
    });

    gulp.watch(src.js, ['js']);
    gulp.watch(src.templates, ['templates']);
    gulp.watch(src.css, ['stylesheets']);
    gulp.watch(src.img, ['images']);
});