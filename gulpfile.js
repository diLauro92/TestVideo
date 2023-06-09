const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean');

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function () {
    return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('code', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function () {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('code'));
    gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));


gulp.task('build', gulp.series('sass', 'scripts'))
{
    const buildCss = gulp.src([
        'app/css/main.css',
    ])
        .pipe(gulp.dest('prod/css'));

    const buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('prod/js'));

    const buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('prod'));

}
