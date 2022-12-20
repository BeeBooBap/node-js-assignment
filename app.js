// imports
const express = require('express');

const PORT = 8080;

// create express app
const app = express();

// routes
const musicData = require('./routes/music');
const spaceData = require('./routes/space');

app.use('/music', musicData.routes);
app.use('/space', spaceData.routes);

// catch all middleware
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

// start server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});