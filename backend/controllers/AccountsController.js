const GenericController = require("./GenericController");
const service = require("../services/AccountsService");
const publicationsQueueService = require("../services/PublicationsQueueService");

class AccountsController extends GenericController {
    constructor(router) {
        super(router, service);

        router.get(`/${service.resourceName}/:id/channels`, this.getChannelsForSpecificAccount);
        router.get(`/${service.resourceName}/:id/channels/:channel/feeds`, this.getChannelFeedsForSpecificAccount);
        router.post(`/${service.resourceName}/:id/channels/:channel/feeds/:feed`, this.downloadChannelFeedsForSpecificAccount);
        router.post(`/${service.resourceName}/:id/videos/:videoId/schedule`, this.scheduleVideo);
    }

    async scheduleVideo(req, res) {
        const accountId = req.params.id;
        const videoId = req.params.videoId;
        const timestamp = req.query.timestamp;

        if (timestamp) {
            res.json(await publicationsQueueService.scheduleVideoAtSpecificTime(accountId, videoId, timestamp));
        } else {
            res.json(await publicationsQueueService.scheduleVideo(accountId, videoId));
        }
    }

    async getChannelsForSpecificAccount(req, res) {
        res.json(await service.getChannelsForSpecificAccount(req.params.id));
    }

    async getChannelFeedsForSpecificAccount(req, res) {
        res.json(await service.getChannelFeedsForSpecificAccount(req.params.id, req.params.channel, req.query.takenAt));
    }

    async downloadChannelFeedsForSpecificAccount(req, res) {
        res.json(await service.downloadChannelFeedsForSpecificAccount(req.params.id, req.params.channel, req.params.feed));
    }
}

module.exports = (router) => new AccountsController(router);