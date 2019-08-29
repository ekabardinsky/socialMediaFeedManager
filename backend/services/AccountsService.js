const GenericEntityService = require("./GenericEntityService");
const instagramService = require("../services/InstagramService");
const videoService = require("../services/VideoService");

class AccountsService extends  GenericEntityService {
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
            return await videoService.downloadFeedVideo(feed, account.type);
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }
}



module.exports = new AccountsService();