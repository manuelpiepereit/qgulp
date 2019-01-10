/**
 * task: watch
 * watches scss, js and php files using livereload
 *
 * @package QGulp
 * @version 0.1.1
 */

const livereload = require('gulp-livereload');

module.exports = function(gulp, config) {
	const reload = done => {
		livereload.reload();
		done();
	};

	return function() {
		livereload.listen();
		gulp.watch(config.watch.css, gulp.series('css'));
		gulp.watch(config.watch.js, gulp.series('js'));
		gulp.watch(config.watch.php, gulp.series(reload));
		gulp.watch(config.watch.images, gulp.series('images', reload));
		console.log('\n\x1b[33m :: watching with liverreload... \x1b[0m\n');
	};
};
