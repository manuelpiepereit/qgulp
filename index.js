const AppRootDir = require('app-root-dir').get();

const tools = require('./tasks/tools');

// tasks
const styles = require('./tasks/task-styles');
// const stylesWP = require('./tasks/task-styles-wp');
const scripts = require('./tasks/task-scripts');
const images = require('./tasks/task-images');
const clear = require('./tasks/task-clear');
const bump = require('./tasks/task-bump');
const livereload = require('./tasks/task-livereload');
const browsersync = require('./tasks/task-browsersync');
const copy = require('./tasks/task-copy');
const ftp = require('./tasks/task-ftp');

// get config files and set some vars
const pkg = require(AppRootDir + '/package.json');
const config = require(AppRootDir + '/.qgulprc.js');

// main function
const qgulp = gulp => {
	if (!gulp) return false; // needs require(qgulp)(gulp);

	// start workflow
	console.log('\n\n\x1b[1m\x1b[33m%s\x1b[0m\x1b[0m\n', ' ---------- starting qgulp workflow ---------- ');

	// define tasks
	gulp.task('css', styles(gulp, config, tools.banner(config, pkg), false));
	gulp.task('js', scripts(gulp, config, tools.banner(config, pkg), false));
	gulp.task('css:build', styles(gulp, config, tools.banner(config, pkg), tools.getBuildMode(config)));
	gulp.task('js:build', scripts(gulp, config, tools.banner(config, pkg), tools.getBuildMode(config)));
	gulp.task('images', images(gulp, config));
	gulp.task('clear', clear(gulp, config));
	gulp.task('copy', copy(gulp, config));
	gulp.task('ftp', ftp(gulp, config));
	// gulp.task('css:wp', stylesWP(gulp, config, pkg));

	// watcher tasks
	gulp.task('watch:livereload', livereload(gulp, config));
	gulp.task('watch:browsersync', browsersync(gulp, config));
	gulp.task('watch', gulp.series('watch:' + tools.getDefaultWatcher(config)));

	// build tasks
	gulp.task('dev', gulp.series('clear', gulp.parallel('css', 'js', 'images', 'copy'))); // build development files
	gulp.task('dist', gulp.series('clear', gulp.parallel('css:build', 'js:build', 'images', 'copy'))); // build distribution files
	gulp.task('build', gulp.series('dist')); // alias for dist

	// version bumps
	gulp.task('bump:patch', bump(gulp, AppRootDir + '/package.json', 'patch'));
	gulp.task('bump:minor', bump(gulp, AppRootDir + '/package.json', 'minor'));
	gulp.task('bump:major', bump(gulp, AppRootDir + '/package.json', 'major'));
	gulp.task('bump', gulp.series('bump:patch')); // defaults to patch

	// default task
	gulp.task('default', gulp.series('dev', 'watch')); // build dev files and then watch

	// dummy task
	gulp.task('dummy', function() {
		return new Promise(function(resolve, reject) {
			console.log('HTTP Server Started');
			console.log(config.title);
			resolve();
		});
	});
};

module.exports = qgulp;

/**
 * some help
 * https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
 *
 */
