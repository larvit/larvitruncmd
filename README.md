# larvitruncmd

Run a shell command and output stdout, stderr etc to console in a nice way (or dont depending on options).

This is created since I found myself writing the same function over and over for my tests.

## Installation

```bash
npm i github:larvit/larvitruncmd
```

## Usage

```javascript
const	runCmd	= require('larvitruncmd');

runCmd('ls -l', function(err, exitCode) {
	if (err) throw err; // If this happends spawn threw an error, this is NOT from an error in the command itself

	console.log('exit Code: ' + exitCode);
})
```

For more options, see source code
