/**
 * The main QGulp config file
 * @package QGulp
 * @version 0.4.0
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
		js: ['./public/_src/js/*.js', '!./public/_src/js/_*.js'],
		jsVendor: ['./public/_src/js-vendor/*.js', '!./public/_src/js-vendor/_*.js'],
		images: './public/_src/img/**',
		wpStylesheet: './public/style.css',

		// copy tasks => destination : source
		copy: { './public/assets/fonts': ['./public/_src/fonts/**/*'] },
		copyVendor: { './public/_src/js-vendor/': ['./node_modules/qcss/js/qcss.js'] },
		clear: ['./public/assets/**'],
	},

	// watcher paths
	watch: {
		css: './public/_src/scss/**/*.scss',
		js: './public/_src/js/**/*.js',
		images: './public/_src/img/**',
		php: './public/**/*.{php,html}',
	},

	// switch off some tasks
	useBabel: false, // if to use babel for compiling js files
	useBrowsersync: false, // use browsersync or livereload as watch task
	useMinOnlyOnBuild: false, // use only minified files when building distribution files
	isWordpressTheme: true, // if developing a wordpress theme

	// js File options
	jsDistFilename: 'scripts.js',
	jsVendorDistFilename: 'scripts-vendor.js',

	// customize gulp plugins
	pluginOptions: {
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
		autoprefixer: { browsers: ['last 6 versions'] },
		sass: {
			includePaths: ['node_modules'],
			errLogToConsole: true,
			outputStyle: 'expanded',
			precision: 10,
		},
		babel: {
			presets: [['@babel/preset-env', { targets: { browsers: 'last 6 versions' } }]],
		},
		imagemin: {
			gifsicle: { interlaced: true },
			jpegtran: { progressive: true },
			optipng: { optimizationLevel: 3 },
			svgo: {
				plugins: [{ removeViewBox: false }, { cleanupIDs: false }, { collapseGroups: false }],
			},
		},
	},

	//////////////////
	/// FTP DEPLOYMENT
	// vinyl-ftp options @source https://www.npmjs.com/package/vinyl-ftp
	ftpOptions: {
		cwd: './public/',
		base: './public/',
		buffer: false,
	},

	// remote folders
	deployDestination: {
		preview: '/remote/folder/preview',
		production: '/remote/folder/live',
	},

	// different deployment tasks, run with gulp ftp:css
	deployTasks: {
		default: ['**/*', '!_src', '!_src/**/*'],
		themes: ['themes/**/*.*'],
	},

	//////////////////
	/// don't change this. is needed to check for outdated config files
	qgulpVersion: '0.4.0',
};
