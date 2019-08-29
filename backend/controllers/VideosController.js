const GenericController = require("./GenericController");
const service = require("../services/VideoService");

class VideosController extends GenericController {
    constructor(router) {
        super(router, service);

        router.post(`/${service.resourceName}/download`, this.download);
    }

    async download(req, res) {
        const feed = req.body;

        if (feed.video_versions) {
            res.json(await service.downloadFeedVideo(feed, "instagram"));
        } else {
            throw Error("Not recognized type of feed " + feed.type);
        }
    }
}

module.exports = (router) => new VideosController(router);