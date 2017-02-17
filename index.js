'use strict';

const	spawn	= require('child_process').spawn;

require('console-info');
require('console-warn');
require('console-error');

/**
 * Run command
 *
 * @param str cmdStr	-	like "ls -l" or "docker run ubuntu"
 * @param obj options	-	{
 *			'silent':	false,
 *			'verySilent':	false, // Does not even output stderr upon exit code != 0
 *			'spawnOptions':	object that will be passed directly to require('child_process').spawn()
 *		}
 * @param func cb(err, exitCode)
 */
function runCmd(cmdStr, options, cb) {
	let	stdErrStr	= '',
		cmd;

	if (typeof options === 'function') {
		cb	= options;
		options	= {};
	}

	if ( ! options) {
		options	= {};
	}

	if (options.silent	=== undefined) options.silent	= false;
	if (options.verySilent	=== undefined) options.verySilent	= false;

	if (typeof cb !== 'function') {
		cb = function() {};
	}

	if (options.verySilent !== true) {
		console.info(cmdStr);
	}

	cmd	= spawn(cmdStr.split(' ')[0], cmdStr.split(' ').splice(0, 1), options.spawnOptions);

	cmd.on('error', cb);

	cmd.stdout.on('data', function(data) {
		if (options.silent !== true && options.verySilent !== true) {
			console.info(data.toString().replace(/\n$/, ''));
		}
	});

	cmd.stderr.on('data', function(data) {
		if (options.silent !== true && options.verySilent !== true) {
			console.warn(data.toString().replace(/\n$/, ''));
		} else if (options.verySilent !== true) {
			stdErrStr += data.toString();
		}
	});

	cmd.on('close', function(exitCode) {
		if (exitCode !== 0 && options.silent === true && options.verySilent !== true) {
			console.error(stdErrStr);
		}

		cb(null, exitCode);
	});
}

module.exports = exports = runCmd;
