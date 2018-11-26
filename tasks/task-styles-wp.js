const replace = require('replace');
/**
 * task: css:wp
 *
 * replaces version number in theme stylesheet
 */
module.exports = function(gulp, config, pkg) {
	return () => {
		return new Promise(function(resolve, reject) {
			const wpStylesheet = config.paths.wpStylesheet;
			// check if file exists
			if (config.isWordpress) {
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
