const integrationService = require("../services/IntegrationsService");

module.exports = (router) => {
    router.get('/integrations', async (req, res) => {
        const integrations = await integrationService.getIntegrations();
        res.json(integrations);
    });

    router.post('/integrations', async (req, res) => {
        res.json(await integrationService.createIntegration(req.body));
    });

    router.put('/integrations/:id', async (req, res) => {
        res.json(await integrationService.updateIntegration(req.params.id, req.body));
    });

    router.delete('/integrations/:id', async (req, res) => {
        res.json(await integrationService.deleteIntegration(req.params.id));
    });
};