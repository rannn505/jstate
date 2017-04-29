import gulp from 'gulp'
import clean from 'gulp-clean'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import header from 'gulp-header'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import htmlmin from 'gulp-htmlmin'
import cleanCSS from 'gulp-clean-css'
import stringify from 'stringify'

const paths = {
    src:  { js: './src/index.js', jsonviewer: './src/jsonviewer/'},
    dest: { js: './dist', jsonviewer: './src/jsonviewer/'}
};
const pkg = require('./package.json');
const banner = ['/*********************************************************',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @copyright Copyright (c) 2017 <%= pkg.author %>',
  ' * @license <%= pkg.license %> (http://www.opensource.org/licenses/mit-license.php)',
  ' * @Compiled At: ' + new Date().toLocaleDateString(),
  '  *********************************************************/',
  ''].join('\n');

gulp.task('clean', () => {
  return gulp.src(paths.dest.js)
    .pipe(clean({force: true}));
});

gulp.task('jsonviewerCSS', () => {
  return gulp.src(paths.src.jsonviewer + 'jsonviewer.css')
   .pipe(cleanCSS({compatibility: 'ie8'}))
   .pipe(rename('jsonviewer.min.css'))
   .pipe(gulp.dest(paths.dest.jsonviewer));
})
gulp.task('jsonviewerJS', () => {
  return gulp.src(paths.src.jsonviewer + 'jsonviewer.js')
   .pipe(uglify())
   .pipe(rename('jsonviewer.min.js'))
   .pipe(gulp.dest(paths.dest.jsonviewer));
})

gulp.task('build', ['clean', 'jsonviewerJS', 'jsonviewerCSS'], () => {
  return browserify({ entries: paths.src.js, standalone: 'jstate', debug: false })
    .transform(stringify, {
       appliesTo: { includeExtensions: ['.html'] },
       minify: true,
       minifyAppliesTo: { includeExtensions: ['.html'] },
       minifyOptions: {
         minifyCSS: true,
         minifyJS:true,
         minifyURLs: true,
         removeEmptyElements: true
       }
     })
  	.transform("babelify")
    .bundle()
    .pipe(source('jstate.js'))
    .pipe(buffer())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest(paths.dest.js))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('jstate.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest.js))
});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['build']);
