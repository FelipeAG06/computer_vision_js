import gulp from 'gulp';
import babel from 'gulp-babel';

const jsPath = './js/*.js';
const destPath = './dist';

gulp.task('build', () => {
    gulp.src(jsPath)
        .pipe(babel())
        .pipe(gulp.dest(destPath))
});

gulp.task('default', () => {
    gulp.watch(jsPath, ['build'])
});