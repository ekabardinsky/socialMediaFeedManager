// init express
const logger = require("./utils/logger");
const appPort = 8080;
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const apiRoute = express.Router();
const authRoute = express.Router();
const passport = require('passport');
require("./passport/passport");
require("express-async-await")(apiRoute); // async support
require("express-async-await")(authRoute); // async support
app.use(bodyParser.json()); // parse application/json

// init controllers
require("./controllers/IntegrationsController")(apiRoute);
require("./controllers/AccountsController")(apiRoute);
require("./controllers/VideosController")(apiRoute);
require("./controllers/SettingsController")(apiRoute);
require("./controllers/PublicationsQueueController")(apiRoute);
require("./controllers/AuthController")(authRoute);

// start to listening for calls
app.use('/api/auth', authRoute);
app.use('/api', passport.authenticate('jwt', {session: false}), apiRoute);

// start jobs
require("./jobs");

app.listen(appPort, function () {
    logger.info(`Api started at ${appPort}`);
});
