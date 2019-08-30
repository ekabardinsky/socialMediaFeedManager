const GenericEntityService = require("./GenericEntityService");
const instagramService = require("../adapters/InstagramAdapter");
const videoService = require("../services/VideoService");
const logger = require("../utils/logger");

class AccountsService extends GenericEntityService {
    constructor() {
        super("accounts");
    }

    async getChannelsForSpecificAccount(accountId) {
        const account = await this.get(accountId);

        if (account.type === 'instagram') {
            return await instagramService.getChannels(account);
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }

    async getChannelFeedsForSpecificAccount(accountId, channel, takenAt) {
        const account = await this.get(accountId);

        if (account.type === 'instagram') {
            return await instagramService.getFeedsByChannel(account, channel, takenAt);
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }

    async downloadChannelFeedsForSpecificAccount(accountId, channel, feed) {
        const account = await this.get(accountId);

        if (account.type === 'instagram') {
            logger.info(`Download video from ${account.type} for feed ${JSON.stringify(feed)}`);
            return await videoService.downloadFeedVideo(feed, account.type);
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }

    async getAvailablePublishTypes(accountId) {
        const account = await this.get(accountId);

        if (account.type === 'instagram') {
            return await instagramService.getAvailablePublishTypes();
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }
}


module.exports = new AccountsService();