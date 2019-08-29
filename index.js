// init express
const appPort = 8080;
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
require("express-async-await")(router); // async support
app.use(bodyParser.json()); // parse application/json

// init controllers
require("./backend/controllers/IntegrationsController")(router);
require("./backend/controllers/AccountsController")(router);
require("./backend/controllers/VideosController")(router);
require("./backend/controllers/SettingsController")(router);

// start to listening for calls
app.use('/api', router);
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(appPort, function () {
    console.log(`App started at ${appPort}`);
});
