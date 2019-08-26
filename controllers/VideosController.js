const GenericController = require("./GenericController");
const service = require("../services/VideoService");

class IntegrationsController extends GenericController {
    constructor(router) {
        super(router, service);

        router.post(`/${service.resourceName}/download`, this.download);
    }

    async download(req, res) {
        const feed = req.body;

        if (feed.video_versions) {
            res.json(await service.downloadFeedVideo(feed));
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }
}

module.exports = (router) => new IntegrationsController(router);