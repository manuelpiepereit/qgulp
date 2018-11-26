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

/**
 * task: images
 *
 * minifies and optimizes png, jpeg, gifs
 */
module.exports = function(gulp, config) {
	return () => {
		let src = config.paths.srcIMG;
		let dest = config.paths.destIMG;

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
			.pipe(
				rename(function(path) {
					tools.sanitizeFilename(path);
				})
			)
			.pipe(gulp.dest(dest))
			.pipe(notify({ message: 'images ready', onLast: true }));
	};
};
