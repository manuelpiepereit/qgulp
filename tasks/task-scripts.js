/**
 * task: scripts
 * concats and minifies js, writes sourcemaps
 *
 * @package QGulp
 * @version 0.4.0
 */

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const header = require('gulp-header');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');
const gulpif = require('gulp-if');

// plugins for scripts
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// global error handler
const errorHandler = r => {
	notify.onError('ERROR: <%= error.message %>')(r);
};

module.exports = function(gulp, config, banner, env) {
	return () => {
		let dest = config.paths.dist + '/js';
		let src = config.paths.js;

		// build production files
		if (env === 'production') {
			if (config.useMinOnlyOnBuild) {
				return dist(gulp, config, banner, src, dest);
			}
			return both(gulp, config, banner, src, dest);
		}

		// build dev files
		return dev(gulp, config, banner, src, dest);
	};
};

// writes js and sourcemap files
const dev = function(gulp, config, banner, src, dest) {
	return gulp
		.src(src)
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(gulpif(config.useBabel, babel(config.pluginOptions.babel)))
		.pipe(concat(config.jsDistFilename))
		.pipe(header(banner))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'scripts ready', onLast: true }));
};

// writes uglified js file
const dist = function(gulp, config, banner, src, dest) {
	return gulp
		.src(src)
		.pipe(plumber(errorHandler))
		.pipe(gulpif(config.useBabel, babel(config.pluginOptions.babel)))
		.pipe(concat(config.jsDistFilename))
		.pipe(uglify())
		.pipe(header(banner))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'scripts ready', onLast: true }));
};

// writes js and sourcemap files and a seperate *.min.js file
const both = function(gulp, config, banner, src, dest) {
	return gulp
		.src(src)
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(gulpif(config.useBabel, babel(config.pluginOptions.babel)))
		.pipe(concat(config.jsDistFilename))
		.pipe(header(banner))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest))
		.pipe(filter('**/*.js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(header(banner))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'scripts ready', onLast: true }));
};
