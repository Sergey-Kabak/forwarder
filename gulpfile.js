var gulp = require('gulp'),
		sass = require('gulp-sass'),
		git = require('gulp-git'),
		browserSync  = require('browser-sync'),
		runSequence = require('run-sequence');

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
        proxy: "vntu.prog",
        notify: false // Отключаем уведомления
    });
});

gulp.task('add', function() { // Инициализация измененных файлов
  console.log('adding...');
  return gulp.src('proj1/')
    .pipe(git.add());
});

gulp.task('gitsend', function() {
  runSequence('add');
});

gulp.task('sass', function(){ // преобразование sass в css
	return gulp.src('proj1/sass/**/*.sass')
	.pipe(sass())
	.pipe(gulp.dest('proj1/css/'))
});
gulp.task('watch', ['browser-sync'], function(){ // отслеживание изменений 
	gulp.watch('proj1/sass/**/*.sass', function(event, cb) {
		setTimeout(function(){gulp.start('sass', browserSync.reload);},500) // задача выполниться через 500 миллисекунд и файл успеет сохраниться на диске
	});
	gulp.watch('proj1/index.html', function() {
		runSequence('add');
	});
	gulp.watch('proj1/*.html', browserSync.reload);
	gulp.watch('proj1/js/**/*.js', browserSync.reload);
	gulp.watch('proj1/**/*.php', browserSync.reload);
});
gulp.task('default', ['watch']);