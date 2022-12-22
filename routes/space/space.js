const express = require('express');

const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const spaceController = require('../../controllers/space');

// Swagger spec /nasa-api/v1/api-docs
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// GET /nasa-api/v1/dummy-img
router.get('/dummy-img', spaceController.getImage);

// GET /nasa-api-v1/apod
router.get('/apod', spaceController.getApod);

// GET /nasa-api-v1/mars-rover
router.get('/mars-rover', spaceController.getMarsRover);

// GET /nasa-api-v1/cme-analysis
router.get('/cme-analysis', spaceController.getCMEAnalysis);

// exporting routes
exports.routes = router;