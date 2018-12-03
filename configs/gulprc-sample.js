/**
 * The main QGulp config file
 *
 * @package QGulp
 * @version 0.2.0
 *
 * main tasks
 * 1. gulp
 * 2. gulp bump[:patch|:minor|:major]
 * 3. gulp build
 */

module.exports = {
	// project options
	title: 'My Project Title',
	copyright: '(c) 2018 Neonpastell GmbH (https://www.neonpastell.de)',

	// paths
	paths: {
		// distribution folder
		dist: './public/assets/',

		// source files
		css: './public/_src/scss/*.scss',
		js: [
			'./public/_src/js/vendor/*.js',
			'!./public/_src/js/vendor/_*.js',
			'./public/_src/js/*.js',
			'!./public/_src/js/_*.js',
		],
		images: './public/_src/img/**',
		wpStylesheet: './public/style.css',

		// copy tasks => destination : source
		copy: { './public/assets/fonts': ['./public/_src/fonts/**/*'] },
		vendorFiles: { './public/_src/js/vendor/': ['./node_modules/qcss/js/qcss.js'] },
		clear: ['./public/assets/**'],
	},

	// watcher paths
	watch: {
		css: './public/_src/scss/**/*.scss',
		js: './public/_src/js/**/*.js',
		images: './public/_src/img/**',
		php: './public/**/*.{php,html}',
	},

	// browsersync options, is used as is
	browserSync: {
		proxy: 'https://your-domain.localhost', // use a proxy
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

	// vinyl-ftp options @source https://www.npmjs.com/package/vinyl-ftp
	ftpOptions: {
		cwd: './public/',
		base: './public/',
		buffer: false,
	},

	// different deployment tasks, eg. gulp ftp:assets
	deploy: {
		// remote : local
		default: { '/remote/folder/': ['**/*', '!_src', '!_src/**/*'] },
		assets: { '/remote/folder/': ['assets/**/*.*'] },
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
