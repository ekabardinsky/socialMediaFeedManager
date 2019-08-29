const GenericEntityService = require("./GenericEntityService");
const request = require('request-promise');
const fs = require("fs").promises;
const path = require('path');
const mediaFilesStore = "media";

class VideoService extends GenericEntityService {
    constructor() {
        super("videos");

        (async () => await this.checkResourceStorage())();
    }


    async checkResourceStorage() {
        const directories = await fs.readdir("./");

        // in case if no storage folder - just create it
        if (!directories.find(dir => dir === mediaFilesStore)) {
            await fs.mkdir(mediaFilesStore);
        }
    }

    async downloadFeedVideo(feed, type) {
        if (type === 'instagram') {
            return await this.downloadInstagramFeedVideo(feed);
        } else {
            throw Error("Not recognized type of account " + type);
        }
    }

    async downloadInstagramFeedVideo(feed) {
        const feeds = await this.getAll();
        const alreadyDownloadedFeed = feeds.find(downloadedFeed => downloadedFeed.feed.id === feed.id);
        if (alreadyDownloadedFeed) {
            return alreadyDownloadedFeed;
        }

        const downloadLink = feed.video_versions[0].url;

        const body = await request({
            uri: downloadLink,
            method: 'GET',
            encoding: "binary"
        });

        const filepath = `${mediaFilesStore}${path.sep}${feed.id}`;
        await fs.writeFile(filepath, Buffer.from(body, 'binary'));
        return await this.create({
            feed,
            filepath
        })
    }
}

module.exports = new VideoService();