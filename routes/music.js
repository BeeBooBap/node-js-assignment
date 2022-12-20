const express = require('express');

const router = express.Router();

// storing results of API call
const musicSearchResults = [];

// get request
router.get('/music', (req, res, next) => {
    console.log('This is where we will make an API call to the Spotify API');
});

// post request
router.post('/music', (req, res, next) => {
    console.log('This is the post request to Spotify');
    musicSearchResults.push({
        title: req.body.title
    });
});

// exporting routes
exports.routes = router;
exports.musicSearchResults = musicSearchResults;