class GenericController {
    constructor(router, service) {
        router.get(`/${service.resourceName}`, async (req, res) => {
            res.json(await service.getAll());
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