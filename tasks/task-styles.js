/**
 * task: styles
 * compiles sass, prefix, sourcempas, minifies
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

module.exports = function(gulp, config, banner, env) {
	return () => {
		let dest = config.paths.dist + '/css';
		let src = config.paths.css;

		let postcssPlugins = [autoprefixer(config.pluginOptions.autoprefixer)];
		let postcssPluginsMin = [cssnano()];

		if (env === 'production') {
			if (config.useMinOnlyOnBuild) {
				return dist(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin);
			}
			return both(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin);
		}

		// build dev files
		return dev(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin);
	};
};

// writes css files with sourcemaps
const dev = function(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin) {
	return gulp
		.src(src, { allowEmpty: true })
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass(config.pluginOptions.sass))
		.on('error', sass.logError)
		.pipe(postcss(postcssPlugins))
		.pipe(header(banner))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'styles ready', onLast: true }));
};

// writes minfied css files without sourcemaps
const dist = function(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin) {
	return gulp
		.src(src, { allowEmpty: true })
		.pipe(plumber(errorHandler))
		.pipe(sass(config.pluginOptions.sass))
		.on('error', sass.logError)
		.pipe(postcss(postcssPlugins))
		.pipe(header(banner))
		.pipe(postcss(postcssPluginsMin))
		.pipe(header(banner))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'styles ready', onLast: true }));
};

// writes css files and sourcemaps and seperate minified vesions *.min.css
const both = function(gulp, config, banner, src, dest, postcssPlugins, postcssPluginsMin) {
	return gulp
		.src(src, { allowEmpty: true })
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass(config.pluginOptions.sass))
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
