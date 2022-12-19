const express = require('express');

const router = express.Router();

// storing results of API call
const googleSearchResults = [];

// get request
router.get('/google', (req, res, next) => {
    console.log('This is where we will make an API call to the Google Places API');
});

// post request
router.post('/google', (req, res, next) => {
    console.log('This is the post request to Google Places');
    googleSearchResults.push({
        title: req.body.title
    });
});

// exporting routes
exports.routes = router;
exports.googleSearchResults = googleSearchResults;