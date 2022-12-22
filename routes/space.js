const express = require('express');

const router = express.Router();

const spaceController = require('../controllers/space');

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