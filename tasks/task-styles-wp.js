/**
 * task: css:wp
 * replaces version number in theme stylesheet
 *
 * @package QGulp
 * @version 0.1.0
 */

const replace = require('replace');

module.exports = function(gulp, config, pkg) {
	return () => {
		return new Promise(function(resolve, reject) {
			const wpStylesheet = config.paths.wpStylesheet;
			// check if file exists
			if (config.isWordpressTheme) {
				replace({
					regex: 'Version: .*',
					replacement: 'Version: ' + pkg.version,
					paths: [wpStylesheet],
					recursive: true,
					silent: true,
				});
			}
			resolve();
		});
	};
};
