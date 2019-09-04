import gulp from 'gulp';
import clean from 'gulp-clean';
import exec from 'gulp-exec';

const prepare = (): NodeJS.ReadWriteStream => gulp.src(['./dist', './ts-dist'], { allowEmpty: true }).pipe(clean());

const bundle = (): NodeJS.ReadWriteStream =>
  gulp
    .src('.')
    .pipe(exec('tsc'))
    .pipe(exec('parcel build --out-file index.bundle.js ts-dist/index.js'));

const cleanUp = (): NodeJS.ReadWriteStream => gulp.src('./ts-dist').pipe(clean());

const copyTypings = (): NodeJS.ReadWriteStream => gulp.src('./index.d.ts').pipe(gulp.dest('./dist'));

gulp.task('build', gulp.series(prepare, bundle, gulp.parallel(cleanUp, copyTypings)));
