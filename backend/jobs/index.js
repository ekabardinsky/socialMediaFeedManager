const FeedsListenerJob = require("./FeedsListenerJob");
const FeedsPublisherJob = require("./FeedsPublisherJob");


// run jobs
new FeedsListenerJob().start();
new FeedsPublisherJob().start();