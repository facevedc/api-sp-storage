const pkg = require('../../package.json');
const loggerCli = require('@facevedc/storebypyme-back-logger-library');
const logger = loggerCli(pkg.name);

module.exports = logger;
