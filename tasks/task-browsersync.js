const browserSync = require('browser-sync').create();

/**
 * task: watch
 *
 * watches scss, js and php files
 */
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
		gulp.watch(config.paths.watchCSS, gulp.series('css', bsReload));
		gulp.watch(config.paths.watchJS, gulp.series('js', bsReload));
		gulp.watch(config.paths.watchPHP, bsReload);
		console.log('\n\x1b[33m :: watching with browsersync... \x1b[0m\n');
	});
};
