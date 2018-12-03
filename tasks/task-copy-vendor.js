/**
 * task: copy-vendor
 * copies files from node_modules to vendor dir for further processing
 *
 * @package QGulp
 * @version 0.1.1
 */

const tools = require('./tools');

module.exports = function(gulp, config) {
	return done => {
		let dirs = config.paths.vendorFiles;

		Object.keys(dirs).map(function(key, index) {
			var src = dirs[key];
			let dest = key;
			// convert to array if is none
			src = Array.isArray(src) ? src : new Array(src);
			// copy each source
			for (let index in src) {
				gulp.src(src[index], { allowEmpty: true })
					.pipe(gulp.dest(dest))
					.on('end', function() {
						if (tools.fileExists(src[index])) {
							console.log('  \x1b[32m✔\x1b[0m ' + src[index] + ' ➜ ' + dest);
						} else {
							console.log('  \x1b[31m✗\x1b[0m ' + src[index] + ' not found');
						}
					});
			}
		});

		done();
	};
};
