const IgApiClient = require("instagram-private-api").IgApiClient;

class InstagramService {
    loggedInUsers = {};

    async login(account) {
        const ig = new IgApiClient();
        ig.state.generateDevice(account.username);
        await ig.simulate.preLoginFlow();
        const auth = await ig.account.login(account.username, account.password);
        await ig.simulate.postLoginFlow();
        return {ig, auth};
    }

    async getClient(account) {
        // already logged in
        if (!this.loggedInUsers[account.username]) {
            this.loggedInUsers[account.username] = await this.login(account);
        }

        return this.loggedInUsers[account.username];
    }

    async getChannels(account) {
        const {ig, auth} = await this.getClient(account);
        return await ig.feed.accountFollowing(auth.pk).items();
    }

    async getFeedsByChannel(account, channel, takenAt) {
        const {ig, auth} = await this.getClient(account);
        const feeds = await ig.feed.user(channel).items();

        if (takenAt) {
            return feeds.filter(feed => feed.taken_at > takenAt);
        } else {
            return feeds;
        }
    }
}

// kind of singleton
module.exports = new InstagramService();