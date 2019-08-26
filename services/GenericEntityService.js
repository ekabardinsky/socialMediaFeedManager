class GenericEntityService {
    constructor(resourceName) {
        this.resourceName = resourceName;
        this.store = require("./StorageService")(resourceName);
    }

    async getAll() {
        return await this.store.getAll(this.resourceName);
    }

    async create(data) {
        return await this.store.create(this.resourceName, this.store.getNextUuid(), data);
    }

    async update(id, data) {
        return await this.store.update(this.resourceName, id, data);
    }

    async delete(id) {
        return await this.store.delete(this.resourceName, id);
    }
}

// kind of singleton
module.exports = GenericEntityService;