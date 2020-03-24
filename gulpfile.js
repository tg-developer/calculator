const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();



function compilaSass() {
    return gulp
    .src('css/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
}))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

gulp.task('sass', compilaSass);


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


function watch() {
    gulp.watch('css/scss/*.scss', compilaSass).on('change', browserSync.reload);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel('watch', 'browser-sync'))