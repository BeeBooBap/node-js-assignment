// imports
const express = require('express');

require('dotenv').config();

const bodyParser = require('body-parser');

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];

// Instantiate wrapper
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
});

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

app.use('/music', musicData.routes);
app.use('/space', spaceData.routes);

// authenticate user 
app.get('/spotify-login', (req, res, next) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

// user redirected upon good auth to /music/user-info
app.get('/callback', (req, res, next) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
  
    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }
  
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
  
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
  
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
  
        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );

        process.env.SPOTIFY_ACCESS_TOKEN = access_token;
        res.redirect('/music/user-info');
  
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
  
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
      });
    });

// get user info
app.get('/music/user-info', async (res, req, next) => {
    await spotifyApi
    .getMe()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
});

// catch all middleware
app.use((req, res, next) => {
    res.send('This is the home page!');
});

// start server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});