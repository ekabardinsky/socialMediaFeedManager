const GenericController = require("./GenericController");
const service = require("../services/IntegrationsService");

class IntegrationsController extends GenericController {
    constructor(router) {
        super(router, service);
    }
}

module.exports = (router) => new IntegrationsController(router);