const GenericController = require("./GenericController");
const service = require("../services/AccountsService");

class IntegrationsController extends GenericController {
    constructor(router) {
        super(router, service);
    }
}

module.exports = (router) => new IntegrationsController(router);