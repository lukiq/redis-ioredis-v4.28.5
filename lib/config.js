'use strict';

const fs = require('fs');
const path = require('path');

let config = {};

if (process.argv[2]) {
	const configPath = process.argv[2];
	if (!fs.existsSync(configPath)) {
		console.log("config file path passed as an argument, but file dosn't exists");
		process.exit(1);
	}
	config = require(path.resolve(__dirname + '/../', configPath));
} else {
    console.log("you have to pass config file path as an argument");
    process.exit(1);
}

module.exports = config