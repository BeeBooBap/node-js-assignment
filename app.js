const express = require('express');

// create express app
const app = express();

// start server
app.listen(3000, () => {
    console.log(`Listening on port ${3000}`);
});