class BaseAdapter {
    getNewsStartFrom(date) {
        throw Error("Not implemented")
    }

    publishFeed(feed) {
        throw Error("Not implemented")
    }
}

module.exports = BaseAdapter;