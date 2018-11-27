/**
 * task: styles
 * compiles sass, prefix, sourcempas, minifies
 *
 * @package QGulp
 * @version 0.1.0
 */

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const header = require('gulp-header');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');

// plugins for styles
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// global error handler
const errorHandler = r => {
	notify.onError('ERROR: <%= error.message %>')(r);
};

module.exports = function(gulp, config, banner, useMinOnlyOnBuild) {
	return () => {
		let src = config.paths.srcCSS;
		let dest = config.paths.destCSS;

		let postcssPlugins = [autoprefixer({ browsers: [config.browserList] })];
		let postcssPluginsMin = [cssnano()];

		if (useMinOnlyOnBuild) {
			return distOnly(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin);
		}

		return both(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin);
	};
};

// writes css files and sourcemaps and seperate minified vesions *.min.css
const both = function(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin) {
	return gulp
		.src(src, { allowEmpty: true })
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(
			sass({
				includePaths: ['node_modules'],
				errLogToConsole: true,
				outputStyle: config.cssOutputStyle,
				precision: config.cssPrecistion,
			})
		)
		.on('error', sass.logError)
		.pipe(postcss(postcssPlugins))
		.pipe(header(banner))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest))
		.pipe(filter('**/*.css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(postcss(postcssPluginsMin))
		.pipe(header(banner))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'styles ready', onLast: true }));
};

// writes css files with sourcemaps
const dev = function(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin) {
	return gulp
		.src(src, { allowEmpty: true })
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass({ errLogToConsole: true, outputStyle: config.cssOutputStyle, precision: 10 }))
		.on('error', sass.logError)
		.pipe(postcss(postcssPlugins))
		.pipe(header(banner))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'styles ready', onLast: true }));
};

// writes minfied css files without sourcemaps
const distOnly = function(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin) {
	return gulp
		.src(src, { allowEmpty: true })
		.pipe(plumber(errorHandler))
		.pipe(sass({ errLogToConsole: true, outputStyle: config.cssOutputStyle, precision: 10 }))
		.on('error', sass.logError)
		.pipe(postcss(postcssPlugins))
		.pipe(header(banner))
		.pipe(postcss(postcssPluginsMin))
		.pipe(header(banner))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'styles ready', onLast: true }));
};
