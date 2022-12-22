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

// authenticate users
exports.getAuth = (req, res, next) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes))
    .then(res.status(200))
    .catch(res.status(401));
};

// generate access token for authenticated users
exports.getCallback = (req, res, next) => {
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
        res.status(200)
        .redirect('/spotify-api/v1/user-info');
  
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
        res.status(400)
        .send(`Error getting Tokens: ${error}`);
      });
    };

// returns user info based on credentials
exports.getUserInfo = async (res, req, next) => {
    await spotifyApi
    .getMe()
    .then(data => {
        console.log(data);
        res.status(200)
        .send(data);
    })
    .catch(error => {
        console.log(error);
        res.status(400);
    })
};

const artistId = '0qeei9KQnptjwb8MgkqEoy';

// gets related artists to provided artistId
exports.getRelatedArtists = async (req, res, next) => {
    await spotifyApi
    .getArtistRelatedArtists(artistId)
    .then(data => {
        console.log(data.body);
        res.status(200)
        .send(data);
    })
    .catch(error => {
        console.log(error);
        res.status(400);
    });
};

// dummy controller to return json hardcoded data
exports.getMusic = (req, res, next) => {
    res.status(200).json({
        posts: [{title: 'First Music Request', content: 'This will return information about an artist!'}]
    });
};