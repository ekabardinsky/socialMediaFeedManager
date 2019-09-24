const cron = require('node-cron');
const logger = require("../utils/logger");
const integrationService = require("../services/IntegrationsService");
const accountService = require("../services/AccountsService");
const moment = require("moment");

class ChallengeRequiredJob {
    processingAnchor = false;

    start() {
        logger.info("ChallengeRequiredJob started");
        cron.schedule('*/5 * * * *', async () => {
            // prevent to run two processors at same time
            if (this.processingAnchor) return;
            this.processingAnchor = true;
            logger.info('Start to check account challenges');

            const accounts = await accountService.getAll();

            for (let i = 0; i < accounts.length; i++) {
                const account = accounts[i];
                account.challengeRequired = await accountService.isChallengeRequired(account.id);
                await accountService.update(account.id, account);
            }

            logger.info('Stop to check account challenges');
            this.processingAnchor = false;
        });
    }
}

module.exports = ChallengeRequiredJob;