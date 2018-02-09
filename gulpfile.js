const gulp = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('develop', function () {
    var stream = nodemon({ script: './dist/index.js'
            , ext: 'js'
            , ignore: ['ignored.js'] })
   
    stream
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('crash', function() {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10)  // restart the server in 10 seconds 
        })
});

gulp.task('default', ['watch', 'assets', 'develop']);