import gulp from 'gulp';
import clean from 'gulp-clean';
import exec from 'gulp-exec';

gulp.task('prepare', () => gulp.src(['./dist', './ts-dist'], { allowEmpty: true }).pipe(clean()));

gulp.task('bundle', () =>
  gulp
    .src('.')
    .pipe(exec('tsc'))
    .pipe(exec('parcel build --out-file index.bundle.js ts-dist/index.js'))
);

gulp.task('clean-up', () => gulp.src('./ts-dist').pipe(clean()));

gulp.task('copy-typings', () => gulp.src('./index.d.ts').pipe(gulp.dest('./dist')));

gulp.task('build', gulp.series('prepare', 'bundle', gulp.parallel('clean-up', 'copy-typings')));
