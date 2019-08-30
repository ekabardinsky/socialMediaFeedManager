const GenericController = require("./GenericController");
const service = require("../services/PublicationsQueueService");

class PublicationsQueueController extends GenericController {
    constructor(router) {
        super(router, service);

        router.post(`/${service.resourceName}/:id/publish`, this.publishQueuedPublication);
    }

    async publishQueuedPublication(req, res) {
        const publication = await service.get(req.params.id);
        res.json(await service.publishVideo(publication.account.id, publication.id));
    }
}

module.exports = (router) => new PublicationsQueueController(router);