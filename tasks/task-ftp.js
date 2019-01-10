/**
 * task: ftp
 * delpoys files via ftp
 *
 * @example gulp ftp
 * @example gulp ftp:theme --production
 *
 * @package QGulp
 * @version 0.4.0
 * @todo to implement
 */

const ftp = require('vinyl-ftp');
const gutil = require('gutil');
const argv = require('yargs').argv;

module.exports = function(gulp, config, configFTP, task) {
	return () => {
		// set environment
		const env = argv.production === undefined ? 'preview' : 'production';

		// set paths
		let remote = config.deployDestination[env];
		let local = config.deployTasks[task];

		// setup ftp connection with log
		const credentials = configFTP[env];
		credentials.log = gutil.log;
		const conn = ftp.create(credentials);

		// setup local and remote paths
		// deployPaths = config.deploy[task];
		// const remote = Object.keys(deployPaths)[0];
		// const local = deployPaths[remote];

		console.log(
			'\n\x1b[33m :: deploying \x1b[1m%s\x1b[0m\x1b[33m to \x1b[1m%s\x1b[0m\x1b[33m via ftp in... \x1b[0m',
			task,
			env
		);

		return delayedRun(
			x => console.log('\x1b[33m    .. ' + x + '\x1b[0m'),
			() => run(gulp, config, conn, local, remote),
			3000
		);
	};
};

const run = function(gulp, config, conn, local, remote) {
	return gulp
		.src(local, config.ftpOptions)
		.pipe(conn.newer(remote)) // only upload newer files
		.pipe(conn.dest(remote));
};

const delayedRun = (callbackTimer, callbackRun, delay) => {
	return new Promise((resolve, reject) => {
		let x = delay / 1000;
		let period = delay / x;
		const interval = setInterval(() => {
			callbackTimer(x);
			if (--x === 0) {
				clearInterval(interval);
				callbackRun();
				return resolve('complete');
			}
		}, period);
	});
};
