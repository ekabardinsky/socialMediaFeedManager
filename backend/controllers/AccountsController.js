const GenericController = require("./GenericController");
const service = require("../services/AccountsService");
const instagram = require("../services/InstagramService");

class AccountsController extends GenericController {
    constructor(router) {
        super(router, service);

        router.get(`/${service.resourceName}/:id/channels`, this.getChannelsForSpecificAccount);
        router.get(`/${service.resourceName}/:id/channels/:channel/feeds`, this.getChannelFeedsForSpecificAccount);
        router.post(`/${service.resourceName}/:id/channels/:channel/feeds/:feed`, this.downloadChannelFeedsForSpecificAccount);
    }

    async getChannelsForSpecificAccount(req, res) {
        const account = await service.get(req.params.id);

        if (account.type === 'instagram') {
            res.json(await instagram.getChannels(account));
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }

    async getChannelFeedsForSpecificAccount(req, res) {
        const account = await service.get(req.params.id);
        const channel = req.params.channel;
        const takenAt = req.query.takenAt;

        if (account.type === 'instagram') {
            res.json(await instagram.getFeedsByChannel(account, channel, takenAt));
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }

    async downloadChannelFeedsForSpecificAccount(req, res) {
        const account = await service.get(req.params.id);
        const channel = req.params.channel;
        const feed = req.params.feed;

        if (account.type === 'instagram') {
            res.json(await instagram.downloadFeedVideo(account, channel, feed));
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }
}

module.exports = (router) => new AccountsController(router);