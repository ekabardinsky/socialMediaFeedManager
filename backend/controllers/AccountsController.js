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
        router.get(`/${service.resourceName}/:id/publishTypes`, this.getAllAdapterPublishTypes);
        router.post(`/${service.resourceName}/:id/challenge/start`, this.startChallenge);
        router.post(`/${service.resourceName}/:id/challenge/submit`, this.submitChallengeChallenge);
    }

    async startChallenge(req, res) {
        res.json(await service.startChallenge(req.params.id));
    }

    async submitChallengeChallenge(req, res) {
        res.json(await service.submitChallengeChallenge(req.params.id, req.body.code));
    }

    async getAllAdapterPublishTypes(req, res) {
        res.json(await service.getAvailablePublishTypes(req.params.id));
    }

    async scheduleVideo(req, res) {
        const accountId = req.params.id;
        const videoId = req.params.videoId;
        const timestamp = req.query.timestamp;
        const publication = req.body;

        if (timestamp) {
            res.json(await publicationsQueueService.scheduleVideoAtSpecificTime(publication, accountId, videoId, timestamp));
        } else {
            res.json(await publicationsQueueService.scheduleVideo(publication, accountId, videoId));
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