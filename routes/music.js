const express = require('express');

const router = express.Router();

const musicController = require('../controllers/music');

// GET /music/info
router.get('/info', musicController.getMusic);

// exporting routes
exports.routes = router;