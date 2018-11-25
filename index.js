const AppRootDir = require('app-root-dir').get();

// get config files and set some vars
const pkg = require(AppRootDir + '/package.json');
const config = require(AppRootDir + '/.qgulprc.js');

// main function
const qgulp = gulp => {
	if (!gulp) return false; // needs require(qgulp)(gulp);

	// start workflow
	console.log('\n\n\n\x1b[33m ---------- starting qgulp workflow ---------- \x1b[0m\n');

	// dummy task
	gulp.task('dummy', function() {
		return new Promise(function(resolve, reject) {
			console.log('HTTP Server Started');
			console.log(config.title);
			resolve();
		});
	});

	// default task
	gulp.task('default', gulp.series('dummy'));
};

module.exports = qgulp;
