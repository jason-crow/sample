/* File: gulpfile.js */

// grab our packages
var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    es = require('event-stream'),
	watch = require('gulp-watch'),
	debug = require('gulp-debug');
// define the default task and add the watch task to it
gulp.task('default', ['inject','watch']);

gulp.task('inject', function () {
	function getMinifiedMainBowerFiles() {
		return bowerFiles().map(function(file){ return file.replace('.css','.min.css').replace('.js','.min.js') })	
	}
	
	return gulp.src('./index.html')
	  .pipe(inject(gulp.src(getMinifiedMainBowerFiles(), {read: false}),{name: 'bower'}))
	  .pipe(inject(es.merge(
		gulp.src('./src/**/*.css', {read: false}),
		gulp.src('./src/**/*.js', {read: false}))), {relative: true})
	  .pipe(gulp.dest('./'));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['jshint']);
  watch(['./src/**/*.js','./bower_components/**/*.js','./src/**/*.css','./bower_components/**/*.css'], function(){
	gulp.start('inject');
  });
});