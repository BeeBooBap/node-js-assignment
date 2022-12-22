const express = require('express');

const router = express.Router();

const stocksController = require('../controllers/stocks');

// GET /stocks-api/v1/time-series
router.get('/time-series', stocksController.getTimeSeries);

// exporting routes
exports.routes = router;