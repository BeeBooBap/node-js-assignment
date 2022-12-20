const express = require('express');

const router = express.Router();

const musicController = require('../controllers/music');

// GET /music/artist
router.get('/artist', musicController.getMusic);

// exporting routes
exports.routes = router;