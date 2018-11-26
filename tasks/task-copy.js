/**
 * task: copy
 *
 * copies files without further processing
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
