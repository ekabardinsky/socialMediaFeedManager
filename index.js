// init express
const logger = require("./backend/utils/logger");
const appPort = 8080;
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const router = express.Router();
require("express-async-await")(router); // async support
app.use(bodyParser.json()); // parse application/json

// init controllers
require("./backend/controllers/IntegrationsController")(router);
require("./backend/controllers/AccountsController")(router);
require("./backend/controllers/VideosController")(router);
require("./backend/controllers/SettingsController")(router);

// start to listening for calls
app.use('/api', router);

// start jobs
require("./backend/jobs");

app.listen(appPort, function () {
    logger.info(`Api started at ${appPort}`);
});
