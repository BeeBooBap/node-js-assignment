const express = require('express');

const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const musicController = require('../controllers/music');

// Swagger spec /spotify-api/v1/api-docs
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// GET /spotify-api/v1/login
router.get('/login', musicController.getAuth);

// GET user redirected upon good auth to /spotify-api/v1/user-info
router.get('/callback', musicController.getCallback);

// GET /spotify-api/v1/user-info
router.get('/user-info', musicController.getUserInfo);

// GET /spotify-api/v1/artist
router.get('/artist', musicController.getMusic);

// GET /spotify-api/v1/related-artists
router.get('/related-artists', musicController.getRelatedArtists);

// exporting routes
exports.routes = router;