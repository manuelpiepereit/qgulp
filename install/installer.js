/**
 * Installs QGulp via npx
 *
 * @package QGulp
 * @version 0.1.0
 */
const fs = require('fs');
const cwd = process.cwd();
const ora = require('ora');
const execa = require('execa');

module.exports = () => {
	console.log('\n\n\x1b[1m\x1b[33m%s\x1b[0m\x1b[0m\n', '---- Starting qgulp installer --------');
	const spinner = ora({ text: '' });

	// define config files for download
	const configFiles = [
		'.babelrc',
		'.editorconfig',
		'.eslintignore',
		'.eslintrc.js',
		'.gitignore',
		'.qgulprc.js',
		'gulpfile.babel.js',
		'package.json',
	];

	spinner.start(`\x1b[2m1.\x1b[0m Copying config files ➜ \x1b[1m${cwd}\x1b[0m`);
	let configFilesOutput = '';
	// copy files to app dir
	Promise.all(
		configFiles.map(x => {
			let src = `${__basedir}/configs/${x}`;
			let dest = `${cwd}/${x}`;

			try {
				fs.copyFileSync(src, dest, fs.constants.COPYFILE_EXCL);
				configFilesOutput += `     \x1b[32m✔\x1b[0m ${x}\n`;
			} catch (err) {
				if ('EEXIST' == err.code) {
					configFilesOutput += `     \x1b[31m✗\x1b[0m ${x} – already existing\n`;
				}
			}
		})
	).then(async () => {
		spinner.succeed();
		console.log(configFilesOutput);
		spinner.start(`\x1b[2m2.\x1b[0m Installing npm packages...`);
		await execa('npm', ['install']);
		spinner.succeed();
		gettingStartet();
	});
};

var gettingStartet = function() {
	// ready
	console.log('\n\x1b[32m✔\x1b[0m \x1b[32m%s\x1b[0m \n', 'Added QGulp files to the current directory.');
	// get started
	console.log('  Getting started');
	console.log('   ➜ edit the \x1b[1m%s\x1b[0m file', '.qgulprc.js');
	console.log('   ➜ run \x1b[1m%s\x1b[0m to start development', 'gulp');
	// bye
	console.log('\n  \x1b[1m\x1b[31m%s\x1b[0m\x1b[0m Happy coding! \n', '♥');
};
