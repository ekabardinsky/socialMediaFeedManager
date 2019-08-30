const cron = require('node-cron');
const logger = require("../utils/logger");
const integrationService = require("../services/IntegrationsService");
const accountService = require("../services/AccountsService");
const moment = require("moment");

class FeedsListenerJob {
    processingAnchor = false;

    start() {
        logger.info("FeedsListenerJob started");
        cron.schedule('*/5 * * * *', async () => {
            // prevent to run two processors at same time
            if (this.processingAnchor) return;
            this.processingAnchor = true;
            logger.info('Start to retrieve new feeds from integrations and downloading video files');
            const integrations = await integrationService.getAll();

            // process it sequentially to not get throttled by adapter
            for (let i = 0; i < integrations.length; i++) {
                await this.processIntegration(integrations[i]);
            }

            logger.info('Stop to retrieve new feeds from integrations and downloading video files');
            this.processingAnchor = false;
        });
    }

    async processIntegration(integration) {
        const now = moment().unix();

        if (integration.lastSyncTime < now) {
            try {
                // update processing time
                await integrationService.update(integration.id, {...integration, lastSyncTime: now});

                // get account type
                const accountId = integration.sourceAccount.id;
                const channelId = integration.sourceChannel.pk;
                const account = await accountService.get(accountId);

                if (account.type === "instagram") {
                    // let's get feeds and filtering them based on lastSyncTime
                    const feeds = await accountService.getChannelFeedsForSpecificAccount(accountId, channelId, integration.lastSyncTime);

                    // downloading all videos start by lastSyncTime
                    return await Promise.all(
                        feeds.map(async feed => {
                            return await accountService.downloadChannelFeedsForSpecificAccount(accountId, channelId, feed);
                        })
                    );
                } else {
                    throw Error(`Unrecognized type supplied ${account.type}`);
                }
            } catch (e) {
                logger.error(e);
            }
        }
    }
}

module.exports = FeedsListenerJob;