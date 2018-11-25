/**
 * The main QGulp config file
 *
 * @package QGulp
 *
 * main tasks
 * 1. gulp
 * 2. gulp bump[:patch|:minor|:major]
 * 3. gulp build
 */

module.exports = {
	// project options
	title: 'My Project Title',
	copyright: '(c) 2018 Neonpastell GmbH',

	// paths
	paths: {
		// sources
		src: './public/_src/',
		srcCSS: './public/_src/scss/*.scss',
		srcJS: [
			'./public/_src/js/vendor/*.js',
			'!./public/_src/js/vendor/_*.js',
			'./public/_src/js/*.js',
			'!./public/_src/js/_*.js',
		],
		srcIMG: './public/_src/img/**',
		srcSVG: './public/_src/svg/**/*',
		srcCOPY: ['./public/_src/fonts/**/*'], // copy array of folders

		// destinations
		dest: './public/assets/',
		destCSS: './public/assets/css/',
		destJS: './public/assets/js/',
		destIMG: './public/assets/img/',
		destSVG: './public/assets/svg/',
		destCOPY: ['./public/assets/fonts/'], // into array of folders

		// watcher
		watchCSS: './public/_src/scss/**/*.scss',
		watchJS: './public/_src/js/**/*.js',
		watchIMG: './public/_src/img/**',
		watchPHP: './public/**/*.{php,html}',

		// wordpress specific
		wpStylesheet: './public/style.css',
	},

	// browsersync options, is used as is
	browserSync: {
		proxy: 'http://lab.qgulp.localhost', // use a proxy
		// server: './public', // path to files
		port: 3000,
		open: false,
		ghostMode: false, // { clicks: true, forms: true, scroll: false }
		injectChanges: true,
		watchEvents: ['change', 'add', 'unlink', 'addDir', 'unlinkDir'],
		notify: true,
		watchOptions: {
			debounceDelay: 1000, // This introduces a small delay when watching for file change events to avoid triggering too many reloads
		},
	},

	// more options
	jsDistFilename: 'scripts.js',
	cssOutputStyle: 'expanded',
	cssPrecistion: 10,
	browserList: 'last 6 versions',
	useBrowsersync: false, // use browsersync or livereload as watch task
	useMinOnlyOnBuild: false, // use only minified files when building distribution files
	isWordpressTheme: true,
};
