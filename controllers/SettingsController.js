const GenericController = require("./GenericController");
const service = require("../services/SettingsService");

class SettingsController extends GenericController {
    constructor(router) {
        super(router, service);

        router.get(`/${service.resourceName}/current`, this.getSettings);
        router.post(`/${service.resourceName}/current`, this.updateSettings);
    }

    async getSettings(req, res) {
        res.json(await service.getSettings());
    }

    async updateSettings(req, res) {
        res.json(await service.updateSettings(req.body));
    }
}

module.exports = (router) => new SettingsController(router);