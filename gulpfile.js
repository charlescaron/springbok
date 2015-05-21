var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var karma = require('karma').server;

var BACKEND_SCRIPTS = ['bin/www', 'api/**/*.js', 'app.js', 'index.js', 'logger.js'];
var FRONTEND_SCRIPTS = ['public/js/**/*.js'];
var ALL_PRODUCTION_SCRIPTS = BACKEND_SCRIPTS.concat(FRONTEND_SCRIPTS);

var BACKEND_TEST_SCRIPTS = ['tests/backend/**/*.js'];
var FRONTEND_TEST_SCRIPTS = ['tests/frontend/**/*.js'];
var ALL_BACKEND_SCRIPTS =  BACKEND_TEST_SCRIPTS.concat(BACKEND_SCRIPTS);
var ALL_FRONTEND_SCRIPTS =  FRONTEND_TEST_SCRIPTS.concat(FRONTEND_SCRIPTS);

gulp.task('lint', function() {

    gulp.src(ALL_PRODUCTION_SCRIPTS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test-front', function (done) {

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('test-back', function (done) {

    gulp.src(BACKEND_SCRIPTS)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(BACKEND_TEST_SCRIPTS)
                .pipe(mocha())
                .pipe(istanbul.writeReports({
                    dir: 'generated/backend-coverage',
                    reporters: ['html']
                }))
                .on('end', done);
        });
});

gulp.task('watch', function() {
    gulp.watch(ALL_BACKEND_SCRIPTS, ['test-back']);
    gulp.watch(ALL_FRONTEND_SCRIPTS, ['test-front']);
});

gulp.task('default', ['lint', 'test-front', 'test-back']);
