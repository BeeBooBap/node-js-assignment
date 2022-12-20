const express = require('express');

const router = express.Router();

const spaceController = require('../controllers/space');

// GET /space/img
router.get('/img', spaceController.getImage);

// exporting routes
exports.routes = router;