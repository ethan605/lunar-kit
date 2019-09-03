import gulp from 'gulp';
import clean from 'gulp-clean';
import exec from 'gulp-exec';

gulp.task('bundle', () =>
  gulp
    .src('.')
    .pipe(exec('tsc'))
    .pipe(exec('parcel build --out-file index.bundle.js ts-dist/index.js'))
);

gulp.task('clean-up', () => gulp.src('./ts-dist', { allowEmpty: true }).pipe(clean()));

gulp.task('build', gulp.series('bundle', 'clean-up'));
