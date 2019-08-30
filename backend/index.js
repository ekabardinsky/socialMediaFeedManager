// init express
const logger = require("./utils/logger");
const appPort = 8080;
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const router = express.Router();
require("express-async-await")(router); // async support
app.use(bodyParser.json()); // parse application/json

// init controllers
require("./controllers/IntegrationsController")(router);
require("./controllers/AccountsController")(router);
require("./controllers/VideosController")(router);
require("./controllers/SettingsController")(router);
require("./controllers/PublicationsQueueController")(router);

// start to listening for calls
app.use('/api', router);

// start jobs
require("./jobs");

app.listen(appPort, function () {
    logger.info(`Api started at ${appPort}`);
});
