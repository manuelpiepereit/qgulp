/**
 * task: bump, bump:patch, bump:minor, bump:major
 * bumps version in file
 *
 * @package QGulp
 * @version 0.1.0
 */

const bump = require('gulp-bump');

module.exports = function(gulp, config, type) {
	return () => {
		return gulp
			.src(config)
			.pipe(bump({ type: type }))
			.pipe(gulp.dest('.'));
	};
};
