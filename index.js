/**
 * Defines Gulp tasks
 *
 * @package QGulp
 * @version 0.4.0
 */

const AppRootDir = require('app-root-dir').get();
const semver = require('semver');
const tools = require('./tasks/tools');

// tasks
const styles = require('./tasks/task-styles');
const stylesWP = require('./tasks/task-styles-wp');
const scripts = require('./tasks/task-scripts');
const scriptsVendor = require('./tasks/task-scripts-vendor');
const images = require('./tasks/task-images');
const clear = require('./tasks/task-clear');
const bump = require('./tasks/task-bump');
const livereload = require('./tasks/task-watch-livereload');
const browsersync = require('./tasks/task-watch-browsersync');
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

	// set environment
	const env = tools.isProduction() ? 'production' : tools.getEnv();

	// show info if config is outdated
	if (semver.satisfies(config.qgulpVersion, '<0.4.0')) {
		console.log(
			`\n\n\x1b[31m  There is a newer version of QGulp installed (${qgulpVersion}). \n  Your config file is outdated (${
				config.qgulpVersion
			}) and could use some updates. \x1b[0m\n`
		);
	}

	// start workflow
	console.log(
		'\n\n \x1b[33m ---------- starting qgulp workflow for \x1b[1m%s\x1b[0m\x1b[33m v%s ---------- \x1b[0m\n \x1b[33m ---------- environment: \x1b[1m%s\x1b[0m\n',
		pkg.name,
		pkg.version,
		env
	);

	// define tasks
	gulp.task('clear', clear(gulp, config));
	gulp.task('css', styles(gulp, config, tools.banner(config, pkg), env));
	gulp.task('css:wp', stylesWP(gulp, config, pkg));
	gulp.task('js', scripts(gulp, config, tools.banner(config, pkg), env));
	gulp.task('js:vendor', scriptsVendor(gulp, config, tools.banner(config, pkg), env));
	gulp.task('images', images(gulp, config));
	gulp.task('copy', copy(gulp, config));

	// additional tasks
	gulp.task('copy:vendor', copyVendor(gulp, config));
	gulp.task('ftp', ftp(gulp, config, configFTP, 'default'));
	Object.keys(config.deployTasks).map(function(key, index) {
		// creates dynamic ftp tasks
		gulp.task('ftp:' + key, ftp(gulp, config, configFTP, key));
	});

	// watcher tasks
	gulp.task('watch:livereload', livereload(gulp, config));
	gulp.task('watch:browsersync', browsersync(gulp, config));
	gulp.task('watch', gulp.series('watch:' + tools.getDefaultWatcher(config)));

	// build tasks
	gulp.task('dev', gulp.series('clear', gulp.parallel('css:wp', 'css', 'js:vendor', 'js', 'images', 'copy'))); // build development files
	gulp.task('dist', gulp.series('dev')); // build production files
	gulp.task('build', gulp.series('dev')); // alias for dist

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
