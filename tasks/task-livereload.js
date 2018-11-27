/**
 * task: watch
 * watches scss, js and php files using livereload
 *
 * @package QGulp
 * @version 0.1.0
 */

const livereload = require('gulp-livereload');

module.exports = function(gulp, config) {
	const reload = done => {
		livereload.reload();
		done();
	};

	return function() {
		livereload.listen();
		gulp.watch(config.paths.watchCSS, gulp.series('css'));
		gulp.watch(config.paths.watchJS, gulp.series('js'));
		gulp.watch(config.paths.watchPHP, gulp.series(reload));
		console.log('\n\x1b[33m :: watching with liverreload... \x1b[0m\n');
	};
};
