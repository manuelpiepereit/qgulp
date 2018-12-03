/**
 * task: copy
 * copies files without further processing
 *
 * @package QGulp
 * @version 0.2.0
 */

const tools = require('./tools');

module.exports = function(gulp, config) {
	return done => {
		let dirs = config.paths.copy;

		Object.keys(dirs).map(function(key, index) {
			var src = dirs[key];
			let dest = key;
			gulp.src(src, { allowEmpty: true }).pipe(gulp.dest(dest));
		});

		done();
	};
};
