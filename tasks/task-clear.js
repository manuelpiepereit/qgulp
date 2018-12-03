/**
 * task: clear
 * removes distribution folder
 *
 * @package QGulp
 * @version 0.2.0
 */

const del = require('del');

module.exports = function(gulp, config) {
	return () => {
		let dest = config.paths.clear;
		return del(dest, { force: true });
	};
};
