# QGulp

A gulp based build process for wordpress


## Installation
  1. run `npx qgulp` in your project root folder. This will install npm packages and config files.
  2. rename `.qgulprc-sample.js` to `.qgulprc.js` and edit it
  3. run `npm run serve` to start watching and building files



## Configuration

#### gulprc.js

  * edit paths for distribution, source, and watch files
  * the `copy` and `vendorFiles` objects are set as key (destination) : value (source) pairs
  * optional edit `browserSync` object and `useBrowsersync` to setup browsersync as default watcher
  * `useMinOnlyOnBuild` won't create extra `.min` files on production.
  * edit `ftpOptions` and the `gulprc-ftp.js` to setup deployment via ftp
  * edit the `deploy` object to setup paths for deployment. You can add more detailed deployment tasks by simply adding a new object. eg: `theme: { '/remote/path/to/theme': ['local/path/to/theme/**/*.*'] }`
  * change `isWordpressTheme` to false if you are not developing a Wordpress Theme

#### gulpfile.babel.js

  * should contain `require('./qgulp/index')(require('gulp'));`

## Usage

You can run the following tasks from installed package.json. These include the core functionality for developing with qgulp.

  * `npm run start` starts the default gulp task which compiles the files in development mode and start the watcher
  * `npm run watch` starts the watcher
  * `npm run dev` compiles files in development mode
  * `npm run dist` compiles files for production
  * `npm run build` alias for `npm run dist`
  * `npm run deploy` deploys files via ftp to production server

#### gulp tasks

Otherwise use the following gulp tasks directly.

  * `gulp` the default task, runs `dev` and then `watch`

#### core gulp tasks
  * `gulp css` compiles scss files for development
  * `gulp js` compiles js files for development
  * `gulp css:build` compiles scss files for production
  * `gulp js:build` compiles js files for production
  * `gulp images` processes image files for production
  * `gulp clear` removes processed files to start fresh
  * `gulp copy` copies files without processing to distribution folder
  * `gulp css:wp` changes version in Wordpress stylesheet style.css
  * `gulp copy-vendor` copies files from vendor folders to source folder. Use this to fetch vendor files, for example from npm packages, to use in your source files.

#### watchers
  * `gulp watch:livereload` starts watching with livereload
  * `gulp watch:browsersync` starts watching with browsersync
  * `gulp watch` starts watcher based on config setting

#### version bumps and build
  * `gulp bump:patch` patch version update in package.json
  * `gulp bump:minor` minor version update in package.json
  * `gulp bump:major` major version update in package.json
  * `gulp bump` alias for `gulp bump:patch`
  * `gulp dev` compiles files in development mode
  * `gulp dist` compiles files for production
  * `gulp build` alias for `gulp dist`

#### deployment
  * `gulp ftp` deploy files to preview server
  * `gulp ftp --production` deploy files to production server
  * `gulp ftp:XX` deploys files defined in deploy config


## Conventions

Distribution files are bundled in subfolders: `img`, `css` and `js` for their respective file types.


## Changelog

### 0.3.0
  * added readme
  * added version checks in config
  * changed config file names to dotfiles

### 0.2.0
  * added ftp tasks
  * updated configs

### 0.1.0
  * initial npm test with core tasks
