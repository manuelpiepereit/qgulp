/**
 * task: images
 * minifies and optimizes images anc svgs
 *
 * @package QGulp
 * @version 0.2.0
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
					imagemin.gifsicle({ interlaced: true }),
					imagemin.jpegtran({ progressive: true }),
					imagemin.optipng({ optimizationLevel: 3 }), // 0-7 low-high
					imagemin.svgo({ plugins: [{ removeViewBox: true }, { cleanupIDs: false }] }),
				])
			)
			.pipe(imagemin(pngquant()))
			.pipe(rename(path => tools.sanitizeFilename(path)))
			.pipe(gulp.dest(dest))
			.pipe(notify({ message: 'images ready', onLast: true }));
	};
};
