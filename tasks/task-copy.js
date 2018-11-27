/**
 * task: copy
 * copies files without further processing
 *
 * @package QGulp
 * @version 0.1.0
 */
module.exports = function(gulp, config) {
	return done => {
		let src = config.paths.srcCOPY;
		let dest = config.paths.destCOPY;

		for (let index in src) {
			gulp.src(src[index], { allowEmpty: true }).pipe(gulp.dest(dest[index]));
		}

		done();
	};
};
