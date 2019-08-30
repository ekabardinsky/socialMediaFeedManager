const IgApiClient = require("instagram-private-api").IgApiClient;
const logger = require("../utils/logger");
const videoService = require("../services/VideoService");
const fs = require("fs");

class InstagramAdapter {
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

    async getAvailablePublishTypes() {
        return ["feed"];
    }

    async publish(account, video, publication) {
        const type = publication.publication.type;
        const {ig, auth} = await this.getClient(account);

        logger.info(`Publish new ${type} for account ${account.id} with video ${video.id}`);

        // generate thumbnail
        const thumbnail = await videoService.generateThumbnail(video.id, {
            size: '800x800',
            filename: `${video.id}_thumbnail.jpg`
        });

        if (type === "feed") {
            const feed = await this.uploadStoryWithMedia(ig, video.filepath, thumbnail, publication.publication);
            return {
                success: true,
                publication: feed
            }
        }

        throw Error(`Not supported type of publication ${type}`);
    }

    async uploadStoryWithMedia(ig, filepath, thumbnailFilepath, publication) {
        const video = Buffer.from(fs.readFileSync(filepath, {encoding: 'binary'}), 'binary');
        const coverImage = Buffer.from(fs.readFileSync(thumbnailFilepath, {encoding: 'binary'}), 'binary');

        // upload video
        return await ig.publish.video({
            video,
            coverImage,
            caption: publication.comment
        });
    }
}

// kind of singleton
module.exports = new InstagramAdapter();