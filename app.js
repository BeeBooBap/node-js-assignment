const express = require('express');

// create express app
const app = express();

// routes
app.use('/itunes', (req, res, next) => {
    console.log('This is where we will make an API call to the iTunes API');
})

app.use('/google', (req, res, next) => {
    console.log('This is where we will make an API call to the Google Places API');
})

app.use('/', (req, res, next) => {
    console.log('This is the home page');
})

// start server
app.listen(3000, () => {
    console.log(`Listening on port ${3000}`);
});