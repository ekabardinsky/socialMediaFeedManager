const GenericController = require("./GenericController");
const service = require("../services/PublicationsQueueService");

class PublicationsQueueController extends GenericController {
    constructor(router) {
        super(router, service);
    }
}

module.exports = (router) => new PublicationsQueueController(router);