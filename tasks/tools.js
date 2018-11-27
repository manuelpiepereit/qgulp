/**
 * Some helper functions
 *
 * @package QGulp
 * @version 0.1.0
 */

const dateformat = require('dateformat');
const changeCase = require('change-case');

module.exports = {
	// creates a banner string for a file header
	banner: (config, pkg) => {
		return [
			'/**!\n * ' + config.title + ', ' + config.copyright,
			' * @version ' + pkg.version,
			' * @date ' + dateformat(new Date(), 'yyyy-mm-dd, HH:MM') + '\n */\n',
		].join('\n');
	},

	// changes hyphenated and lowercase file names
	// @source https://stackoverflow.com/questions/36195036/changing-output-directories-files-to-lowercase-in-gulp
	sanitizeFilename: path => {
		path.dirname = path.dirname;
		path.basename = path.extname == '' ? path.basename : changeCase.paramCase(path.basename);
		path.extname = path.extname == '' ? path.extname : '.' + changeCase.paramCase(path.extname);
		return path;
	},

	// check which watcher to use
	getDefaultWatcher: config => {
		return config.useBrowsersync ? 'browsersync' : 'livereload';
	},

	// check which build mode to use
	getBuildMode: config => {
		return config.useMinOnlyOnBuild;
	},
};
