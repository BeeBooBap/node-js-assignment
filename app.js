// imports
const express = require('express');

require('dotenv').config();

const bodyParser = require('body-parser');

// create express app
const app = express();

// middleware to parse incoming json data
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// routes
const musicData = require('./routes/music');
const spaceData = require('./routes/space');

app.use('/spotify-api/v1', musicData.routes);
app.use('/space', spaceData.routes);

// catch all middleware
// app.use((req, res, next) => {
//     res.send('This is the home page!');
// });

// start server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});