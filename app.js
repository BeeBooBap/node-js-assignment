// imports
const express = require('express');

// create express app
const app = express();

// routes
const itunesData = require('./routes/itunes.js');
const googleData = require('./routes/google');

app.use(itunesData.routes);
app.use(googleData.routes);

// catch all middleware
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

// start server
app.listen(3000, () => {
    console.log(`Listening on port ${3000}`);
});