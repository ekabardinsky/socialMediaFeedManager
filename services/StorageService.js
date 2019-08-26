const fs = require("fs").promises;
const storageFolder = "storage";
const path = require('path');

class StorageService {

    async checkResourceStorage(resourceName) {
        const directories = await fs.readdir("./");

        // in case if no storage folder - just create it
        if (!directories.find(dir => dir === storageFolder)) {
            await fs.mkdir(storageFolder);
        }

        // let's read resources
        const resources = await fs.readdir(`${storageFolder}${path.sep}`);

        if (!resources.find(dir => dir === resourceName)) {
            await fs.mkdir(`${storageFolder}${path.sep}${resourceName}`);
        }
    }

    async create(resourceName, id, data) {
        await fs.writeFile(`${storageFolder}${path.sep}${resourceName}${path.sep}${id}`, JSON.stringify(data));
        return await this.get(resourceName, id);
    }

    async update(resourceName, id, data) {
        await fs.writeFile(`${storageFolder}${path.sep}${resourceName}${path.sep}${id}`, JSON.stringify(data));
        return await this.get(resourceName, id);
    }

    async delete(resourceName, id) {
        await fs.unlink(`${storageFolder}${path.sep}${resourceName}${path.sep}${id}`)
    }

    async get(resourceName, id) {
        const data = JSON.parse(await fs.readFile(`${storageFolder}${path.sep}${resourceName}${path.sep}${id}`, 'utf8'));

        return {id, ...data};
    }

    async getAll(resourceName) {
        const ids = await fs.readdir(`${storageFolder}${path.sep}${resourceName}${path.sep}`);

        return await Promise.all(
            ids.map(async (id) => {
                const data = await this.get(resourceName, id);
                return {id, ...data}
            })
        )
    }

    getNextUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

// kind of singleton
const store = new StorageService();
module.exports = (resourceName) => {
    (async () => {
        await store.checkResourceStorage(resourceName);
    })();

    return store;
};