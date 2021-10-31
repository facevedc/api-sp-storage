require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { cors_dns, profile, port } = require('./config/constant.config');
const config = require('@felipe.acevedo91/storebypyme-back-db-library').ConfigDb;
const app = express();
const router = require('./route/route');
const logger = require('./utils/logger.util');

config.start(logger);
const statusMongo = config.connectionStatus();

app.set('port', port);
app.use(
  cors({
    origin: new RegExp(cors_dns),
  })
);
app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Content-type', 'application/json');
  next();
});
app.listen(app.get('port'), () => {
  logger.info(`Server started as '${profile}' environment on http://localhost:${port}`);
  logger.info(`Status MongoDB connection: '${statusMongo}' `);
});

module.exports = app;
