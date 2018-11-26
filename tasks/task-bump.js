const bump = require('gulp-bump');

/**
 * task: bump, bump:patch, bump:minor, bump:major
 *
 * bumps version in config file
 */
module.exports = function(gulp, config, type) {
	return () => {
		return gulp
			.src(config)
			.pipe(bump({ type: type }))
			.pipe(gulp.dest('.'));
	};
};
