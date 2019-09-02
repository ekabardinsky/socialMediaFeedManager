class GenericEntityService {
    constructor(resourceName) {
        this.resourceName = resourceName;
        this.store = require("./StorageService")(resourceName);
    }

    async getAll(query) {
        let entities = await this.store.getAll(this.resourceName);
        if (!query) {
            return entities;
        } else {
            Object
                .keys(query)
                .forEach(filter => {
                    const getDefaultValue = (type) => {
                        if (type === 'boolean') {
                            return false;
                        } else if (type === 'string') {
                            return '';
                        }
                    };

                    const getValue = (value, filterValue) => {
                        if (typeof (value) === 'undefined') {
                            return getDefaultValue(typeof (filterValue))
                        } else {
                            return value;
                        }
                    };

                    const filteringValue = eval(query[filter]);
                    entities = entities.filter(entity => getValue(entity[filter], filteringValue) == filteringValue)
                });

            return entities;
        }
    }

    async get(id) {
        return await this.store.get(this.resourceName, id);
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