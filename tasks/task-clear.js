const del = require('del');

/**
 * task: clear
 *
 * removes distribution folder
 */
module.exports = function(gulp, config) {
	return () => {
		let dest = config.paths.dest;

		if (dest) {
			return del([dest], { force: true });
		}

		// @note test
		return del([config.paths.destCSS, config.paths.destJS, config.paths.destIMG], { force: true });
	};
};
