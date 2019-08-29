const GenericEntityService = require("./GenericEntityService");
const videoService = require("./VideoService");
const accountsService = require("./AccountsService");
const moment = require("moment");
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

    async scheduleVideoAtSpecificTime(accountId, videoId, timestamp) {
        const account = await accountsService.get(accountId);
        const video = await videoService.get(videoId);
        const newPublication = await this.create({
            video,
            date: timestamp,
            account
        });
        await videoService.update(videoId, {...video, schedule: newPublication});

        return newPublication;
    }

    async scheduleVideo(accountId, videoId) {
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
                    video,
                    date: nextTimestampStep,
                    account
                });

                await videoService.update(videoId, {...video, schedule: newPublication});
            }
            currentTimestampStep += timeStepInQueue;
        }

        return newPublication;
    }
}

module.exports = new PublicationsQueueService();