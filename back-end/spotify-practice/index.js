var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
//var spotifyApi = new SpotifyWebApi({
//    clientId : '6c792eb4871e4c61832806d8e31aa947',
//    clientSecret : '82117e499eec43d3be315c27bc440b5f',
//    redirectUri : 'http://www.example.com/callback'
//});

 var access_token = 'BQCoEkeGrVzmaQNw44pJjP5yu9QppuALFduNgYUgqjBMEtjTyYArio0nGdApDguM2RxR3uLy2mhgPgy7Z_OH6lWtJGRscw0B9oUkrOmackiDnUt9JPQqXsV3MPkKOontktLokEA2vX0m'

var scopes = ['playlist-read-private', 'playlist-modify-private','playlist-modify-public', 'user-library-read user-library-modify user-top-read user-follow-read'],
    redirectUri = 'https://example.com/callback',
    clientId = '6c792eb4871e4c61832806d8e31aa947',
    state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
    redirectUri : redirectUri,
    clientId : clientId
});


// spotifyApi.
GET https:accounts.spotify.com/authorize/?client_id=6c792eb4871e4c61832806d8e31aa947&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback
&scope=playlist-read-private playlist-modify-private playlist-modify-public user-library-read user-library-modify user-top-read user-follow-read
&state=34fFs29kd09
// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);

