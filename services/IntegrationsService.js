const resourceName = "integrations";
const store = require("./StorageService")(resourceName);

class IntegrationsService {
    async getIntegrations() {
        return await store.getAll(resourceName);
    }

    async createIntegration(integration) {
        return await store.create(resourceName, store.getNextUuid(), integration);
    }

    async updateIntegration(id, integration) {
        return await store.update(resourceName, id, integration);
    }

    async deleteIntegration(id) {
        return await store.delete(resourceName, id);
    }
}

// kind of singleton
module.exports = new IntegrationsService();