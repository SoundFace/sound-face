var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId : '6c792eb4871e4c61832806d8e31aa947',
    clientSecret : '82117e499eec43d3be315c27bc440b5f',
    redirectUri : 'http://www.example.com/callback'
});

// spotifyApi.
GET https:accounts.spotify.com/authorize/?client_id=6c792eb4871e4c61832806d8e31aa947&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback
&scope=playlist-read-private playlist-modify-private playlist-modify-public user-library-read user-library-modify user-top-read user-follow-read
&state=34fFs29kd09