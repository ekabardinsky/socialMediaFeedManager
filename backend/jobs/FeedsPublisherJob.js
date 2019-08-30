const cron = require('node-cron');
const logger = require("../utils/logger");
const publicationsQueueService = require("../services/PublicationsQueueService");

class FeedsPublisherJob {
    processingAnchor = false;

    start() {
        logger.info("FeedsPublisherJob started");
        cron.schedule('*/5 * * * *', async () => {
            // prevent to run two processors at same time
            if (this.processingAnchor) return;
            this.processingAnchor = true;

            logger.info('Start to publish queued feeds');
            const unpublishedFeeds = await publicationsQueueService.getAllUnpublished();

            // process it sequentially to not get throttled by adapter
            for (let i = 0; i < unpublishedFeeds.length; i++) {
                try {
                    await publicationsQueueService.publishVideo(unpublishedFeeds[i].account.id, unpublishedFeeds[i].id);
                } catch (e) {
                    logger.error(e);
                }
            }

            logger.info('Stop to publish queued feeds');
            this.processingAnchor = false;
        });
    }


}

module.exports = FeedsPublisherJob;