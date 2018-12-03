/**
 * task: watch
 * watches scss, js and php files using browsersync
 *
 * @package QGulp
 * @version 0.1.1
 */

const browserSync = require('browser-sync').create();

module.exports = function(gulp, config) {
	const bsInit = done => {
		browserSync.init(config.browserSync);
		done();
	};

	const bsReload = done => {
		browserSync.reload();
		done();
	};

	return gulp.parallel(bsInit, () => {
		gulp.watch(config.watch.css, gulp.series('css', bsReload));
		gulp.watch(config.watch.js, gulp.series('js', bsReload));
		gulp.watch(config.watch.php, bsReload);
		gulp.watch(config.watch.images, gulp.series('images', bsReload));
		console.log('\n\x1b[33m :: watching with browsersync... \x1b[0m\n');
	});
};
