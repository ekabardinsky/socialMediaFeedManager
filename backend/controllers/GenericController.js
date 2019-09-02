class GenericController {
    constructor(router, service) {
        this.router = router;
        this.service = service;

        router.get(`/${service.resourceName}`, async (req, res) => {
            res.json(await service.getAll(req.query));
        });

        router.get(`/${service.resourceName}/:id`, async (req, res) => {
            res.json(await service.get(req.params.id));
        });

        router.post(`/${service.resourceName}`, async (req, res) => {
            res.json(await service.create(req.body));
        });

        router.put(`/${service.resourceName}/:id`, async (req, res) => {
            res.json(await service.update(req.params.id, req.body));
        });

        router.delete(`/${service.resourceName}/:id`, async (req, res) => {
            res.json(await service.delete(req.params.id));
        });
    }
}

module.exports = GenericController;