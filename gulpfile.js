'use strict';

const { src, dest } = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const removeComments = require('gulp-strip-css-comments');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const panini = require('panini');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const rigger = require('gulp-rigger');
const gifsicle = require('imagemin-gifsicle');
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');


/* Paths */
const srcPath = 'src/';
const distPath = 'dist/';

const path = {
    build: {
        html: distPath,
        css: distPath + 'assets/css/',
        js: distPath + 'assets/js/',
        images: distPath + 'assets/images/',
        fonts: distPath + 'assets/fonts/'
    },
    src: {
        html: srcPath + '*.html',   
        css: srcPath + 'assets/scss/*.scss',
        js: srcPath + 'assets/js/*.js',
        images: srcPath + 'assets/images/**/*.{jpg,jpeg,png,svg,gif,webp,ico,xml,json,webmanifest}',
        fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}'
    },
    watch: {
        html: srcPath + '**/*.html',   
        css: srcPath + 'assets/scss/**/*.scss',
        js: srcPath + 'assets/js/**/*.js',
        images: srcPath + 'assets/images/**/*.{jpg,jpeg,png,svg,gif,webp,ico,xml,json,webmanifest}',
        fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}'
    },
    clean: './' + distPath 
};

function server() {
    browserSync.init({
        server: {
            baseDir: './' + distPath
        }
    });
}

function html() {
    panini.refresh();
    return src(path.src.html, { base: srcPath })
        .pipe(plumber())
        .pipe(panini({
            root: srcPath,
            layouts: srcPath + 'templates/layouts/',
            partials: srcPath + 'templates/partials/'
        }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({ stream: true }));
}

function css() {
     return src(path.src.css, {base: srcPath + 'assets/scss/' })
         .pipe(plumber({
             errorHandler: function (err) {
                 notify.onError({
                     title: 'SCSS Error',
                     message: 'Error: <%= error.message %>'
                 })(err);
                 this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
            removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }));
}

function js() {
    return src(path.src.js, {base: srcPath + 'assets/js'})
        .pipe(plumber({
             errorHandler: function (err) {
                 notify.onError({
                     title: 'JS Error',
                     message: 'Error: <%= error.message %>'
                 })(err);
                 this.emit('end');
            }
        }))
        .pipe(rigger())
        .pipe(dest(path.build.js))
        .pipe(uglify())
            .pipe(rename({
                suffix: '.min',
                extname: '.js'
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({ stream: true }));
}

function images() {
    return src(path.src.images, {base: srcPath + 'assets/images'})
        .pipe(imagemin([
            mozjpeg({quality: 90, progressive: true}),
	        optipng({optimizationLevel: 5}),
        ]))
        .pipe(dest(path.build.images))
        .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
    return src(path.src.fonts, { base: srcPath + 'assets/fonts' })
        .pipe(ttf2woff2())
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.reload({ stream: true }));
}

function clean() {
    return del(path.clean);
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.images], images);
    gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, server);

exports.html = html; 
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
