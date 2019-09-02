const GenericEntityService = require("./GenericEntityService");
const videoService = require("./VideoService");
const accountsService = require("./AccountsService");
const instagramService = require("../adapters/InstagramAdapter");
const moment = require("moment");
const logger = require("../utils/logger");
const timeStepInQueue = 5 * 60; // five minutes

class PublicationsQueueService extends GenericEntityService {
    constructor() {
        super("publicationsQueue");
    }

    async getAllStartByTimestamp(account, timestamp) {
        const all = await this.getAll();
        return all
            .filter(publication => publication.account.id === account.id)
            .filter(publication => publication.date >= timestamp);
    }


    async getAllUnpublished() {
        const all = await this.getAll();
        return all
            .filter(publication => !publication.published);
    }

    async scheduleVideoAtSpecificTime(publication, accountId, videoId, timestamp) {
        const account = await accountsService.get(accountId);
        const video = await videoService.get(videoId);
        const newPublication = await this.create({
            publication,
            video,
            date: timestamp,
            account
        });
        await videoService.update(videoId, {...video, schedule: newPublication});

        return newPublication;
    }

    async scheduleVideo(publication, accountId, videoId) {
        const account = await accountsService.get(accountId);
        const video = await videoService.get(videoId);
        const now = moment().unix();
        let currentTimestampStep = now - (now % timeStepInQueue);

        const schedules = await this.getAllStartByTimestamp(account, currentTimestampStep);

        // iterate over time to find free period
        let scheduled = false;
        let newPublication = null;
        while (!scheduled) {
            const nextTimestampStep = currentTimestampStep + timeStepInQueue;

            const scheduledPublications = schedules.filter(schedule => schedule.date > currentTimestampStep && schedule.date <= nextTimestampStep);

            if (scheduledPublications.length === 0) {
                // found a time to place publication
                scheduled = true;

                newPublication = await this.create({
                    publication,
                    video,
                    date: nextTimestampStep,
                    account
                });

                await videoService.update(videoId, {...video, schedule: newPublication, queued: true});
            }
            currentTimestampStep += timeStepInQueue;
        }

        return newPublication;
    }

    async publishVideo(accountId, publicationId) {
        const publication = await this.get(publicationId);
        const account = await accountsService.get(accountId);
        const video = await videoService.get(publication.video.id);

        if (account.type === 'instagram') {
            try {
                const metadata = await instagramService.publish(account, video, publication);
                await this.update(publicationId, {...publication, published: true, metadata});
            } catch (e) {
                await this.update(publicationId, {...publication, published: true, failureMessage: JSON.stringify(e)});
                logger.error(e);
            }
        } else {
            throw Error("Not recognized type of account " + account.type);
        }
    }
}

module.exports = new PublicationsQueueService();