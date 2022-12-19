const express = require('express');

const router = express.Router();

// storing results of API call
const searchResults = [];

// get request
router.get('/itunes', (req, res, next) => {
    console.log('This is where we will make an API call to the iTunes API');
});

// post request
router.post('/itunes', (req, res, next) => {
    console.log('This is the post request to itunes');
    searchResults.push({
        title: req.body.title
    });
});

// exporting routes
exports.routes = router;
exports.searchResults = searchResults;