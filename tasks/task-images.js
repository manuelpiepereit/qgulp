/**
 * task: images
 * minifies and optimizes images anc svgs
 *
 * @package QGulp
 * @version 0.4.0
 */

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const tools = require('./tools');

// plugins for media
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

// global error handler
const errorHandler = r => {
	notify.onError('ERROR: <%= error.message %>')(r);
};

module.exports = function(gulp, config) {
	return () => {
		let dest = config.paths.dist + '/img';
		let src = config.paths.images;

		return gulp
			.src(src)
			.pipe(plumber(errorHandler))
			.pipe(
				imagemin([
					imagemin.gifsicle(config.pluginOptions.imagemin.gifsicle),
					imagemin.jpegtran(config.pluginOptions.imagemin.jpegtran),
					imagemin.optipng(config.pluginOptions.imagemin.optipng),
					imagemin.svgo(config.pluginOptions.imagemin.svgo),
				])
			)
			.pipe(imagemin(pngquant()))
			.pipe(rename(path => tools.sanitizeFilename(path)))
			.pipe(gulp.dest(dest))
			.pipe(notify({ message: 'images ready', onLast: true }));
	};
};
