const GenericEntityService = require("./GenericEntityService");

class SettingsService extends GenericEntityService {
    constructor() {
        super("settings");
    }

    async getSettings() {
        const settings = await this.getAll();

        if (settings.length > 0) {
            return settings[0];
        } else {
            return await this.create({});
        }
    }

    async updateSettings(newSettings) {
        const settings = await this.getSettings();
        return await this.update(settings.id, newSettings);
    }
}

module.exports = new SettingsService();