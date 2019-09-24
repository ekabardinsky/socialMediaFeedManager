const FeedsListenerJob = require("./FeedsListenerJob");
const FeedsPublisherJob = require("./FeedsPublisherJob");
const ChallengeRequiredJob = require("./ChallengeRequiredJob");


// run jobs
new FeedsListenerJob().start();
new FeedsPublisherJob().start();
new ChallengeRequiredJob().start();