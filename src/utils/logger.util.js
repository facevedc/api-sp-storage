const pkg = require('../../package.json');
const loggerCli = require('@felipe.acevedo91/storebypyme-back-logger-library');
const logger = loggerCli(pkg.name);

module.exports = logger;
