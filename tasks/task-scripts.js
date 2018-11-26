const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const header = require('gulp-header');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');

// plugins for scripts
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// global error handler
const errorHandler = r => {
	notify.onError('ERROR: <%= error.message %>')(r);
};

/**
 * task: styles
 *
 * compiles sass, prefix, sourcempas, minifies
 */
module.exports = function(gulp, config, banner, useMinOnlyOnBuild) {
	return () => {
		let src = config.paths.srcJS;
		let dest = config.paths.destJS;

		if (useMinOnlyOnBuild) {
			return distOnly(gulp, config, banner, src, dest);
		}

		return both(gulp, config, banner, src, dest);
	};
};

// writes js and sourcemap files and a seperate *.min.js file
const both = function(gulp, config, banner, src, dest) {
	return gulp
		.src(src, { since: gulp.lastRun('js') })
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(babel({ presets: [['@babel/preset-env', { targets: { browsers: config.browserList } }]] }))
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

// writes js and sourcemap files
const dev = function(gulp, config, banner, src, dest) {
	return gulp
		.src(src, { since: gulp.lastRun('js') })
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(babel({ presets: [['@babel/preset-env', { targets: { browsers: config.browserList } }]] }))
		.pipe(concat(config.jsDistFilename))
		.pipe(header(banner))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'scripts ready', onLast: true }));
};

// writes uglified js file
const distOnly = function(gulp, config, banner, src, dest) {
	return gulp
		.src(src, { since: gulp.lastRun('js') })
		.pipe(plumber(errorHandler))
		.pipe(babel({ presets: [['@babel/preset-env', { targets: { browsers: config.browserList } }]] }))
		.pipe(concat(config.jsDistFilename))
		.pipe(uglify())
		.pipe(header(banner))
		.pipe(gulp.dest(dest))
		.pipe(livereload())
		.pipe(notify({ message: 'scripts ready', onLast: true }));
};
