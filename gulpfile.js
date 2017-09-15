var gulp = require('gulp'),
		sass = require('gulp-sass'),
		git = require('gulp-git'),
		argv = require('yargs').argv,
		runSequence = require('run-sequence');

gulp.task('init', function() {
  console.log(argv.m);
});

gulp.task('add', function() {
  console.log('adding...');
  return gulp.src('.')
    .pipe(git.add());
});

gulp.task('commit', function() {
  console.log('commiting');
  if (argv.m) {
    return gulp.src('.')
      .pipe(git.commit(argv.m));
  }
});

gulp.task('push', function(){
  console.log('pushing...');
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('gitsend', function() {
  runSequence('add', 'commit', 'push');
});

gulp.task('sass', function(){
	return gulp.src('proj1/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('proj1/css/'))
});

gulp.task('watch', function(){
	gulp.watch('proj1/sass/**/*.sass', function(event, cb) {
		setTimeout(function(){gulp.start('sass');},500) // задача выполниться через 500 миллисекунд и файл успеет сохраниться на диске
	});
});
gulp.task('default', ['watch']);