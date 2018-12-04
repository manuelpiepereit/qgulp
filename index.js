/**
 * Defines Gulp tasks
 *
 * @package QGulp
 * @version 0.3.0
 */

const AppRootDir = require('app-root-dir').get();
const semver = require('semver');
const tools = require('./tasks/tools');

// tasks
const styles = require('./tasks/task-styles');
const stylesWP = require('./tasks/task-styles-wp');
const scripts = require('./tasks/task-scripts');
const images = require('./tasks/task-images');
const clear = require('./tasks/task-clear');
const bump = require('./tasks/task-bump');
const livereload = require('./tasks/task-livereload');
const browsersync = require('./tasks/task-browsersync');
const copy = require('./tasks/task-copy');
const copyVendor = require('./tasks/task-copy-vendor');
const ftp = require('./tasks/task-ftp');

// get config files
const pkg = require(AppRootDir + '/package.json');
const config = require(AppRootDir + '/.qgulprc.js');
const configFTP = require(AppRootDir + '/.qgulprc-ftp.js');
const qgulpVersion = require('./package.json').version;

// main function
const qgulp = gulp => {
	if (!gulp) return false;

	// show info if config is outdated
	if (semver.satisfies(config.qgulpVersion, '<0.3.0')) {
		console.log(
			`\n\n\x1b[31m  There is a newer version of QGulp installed (${qgulpVersion}). \n  Your config file is outdated (${
				config.qgulpVersion
			}) and could use some updates. \x1b[0m\n`
		);
	}

	// start workflow
	console.log(
		'\n\n \x1b[33m ---------- starting qgulp workflow for \x1b[1m%s\x1b[0m\x1b[33m v%s ---------- \x1b[0m\n',
		pkg.name,
		pkg.version
	);

	// define tasks
	gulp.task('css', styles(gulp, config, tools.banner(config, pkg), false));
	gulp.task('js', scripts(gulp, config, tools.banner(config, pkg), false));
	gulp.task('css:build', styles(gulp, config, tools.banner(config, pkg), tools.getBuildMode(config)));
	gulp.task('js:build', scripts(gulp, config, tools.banner(config, pkg), tools.getBuildMode(config)));
	gulp.task('images', images(gulp, config));
	gulp.task('clear', clear(gulp, config));
	gulp.task('copy', copy(gulp, config));
	gulp.task('css:wp', stylesWP(gulp, config, pkg));
	gulp.task('copy-vendor', copyVendor(gulp, config));
	gulp.task('ftp', ftp(gulp, config, configFTP, 'default'));
	Object.keys(config.deploy).map(function(key, index) {
		gulp.task('ftp:' + key, ftp(gulp, config, configFTP, key));
	});

	// watcher tasks
	gulp.task('watch:livereload', livereload(gulp, config));
	gulp.task('watch:browsersync', browsersync(gulp, config));
	gulp.task('watch', gulp.series('watch:' + tools.getDefaultWatcher(config)));

	// build tasks
	gulp.task('dev', gulp.series('clear', gulp.parallel('css:wp', 'css', 'js', 'images', 'copy'))); // build development files
	gulp.task('dist', gulp.series('clear', gulp.parallel('css:wp', 'css:build', 'js:build', 'images', 'copy'))); // build distribution files
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
			console.log('just a task to test if gulp works');
			resolve();
		});
	});
};

module.exports = qgulp;
