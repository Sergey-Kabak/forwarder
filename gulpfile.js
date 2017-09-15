var gulp = require('gulp'),
		sass = require('gulp-sass'),
		git = require('gulp-git');

gulp.task('sass', function(){
	return gulp.src('proj1/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('proj1/css/'))
});
gulp.task('add', function(){
  return gulp.src('proj1/index.html')
    .pipe(git.add());
});

gulp.task('watch', function(){
	gulp.watch('proj1/sass/**/*.sass', ['add'], function(event, cb) {
		setTimeout(function(){gulp.start('sass');},500) // задача выполниться через 500 миллисекунд и файл успеет сохраниться на диске
	});
});
gulp.task('default', ['watch']);