// init express
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

// start to listening for calls
app.use('/api', router);
app.listen(appPort, function () {
    console.log(`App started at ${appPort}`);
});
