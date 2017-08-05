var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
//var spotifyApi = new SpotifyWebApi({
//    clientId : '6c792eb4871e4c61832806d8e31aa947',
//    clientSecret : '82117e499eec43d3be315c27bc440b5f',
//    redirectUri : 'http://www.example.com/callback'
//});

// var access_token = 'BQCDZboDqUHKruRF9dSTTH56ZW9TdlGDAAUklh7RZWqFdtFTs4UoZHksRbnZSG2grEPgP6MxT6k_gWVlPerNDEDa_bBbqu5JAbEzA-0vTfbjR3EzKZw7GR5-89baeHJiIhy17l242Dmn'

var scopes = ['user-read-private', 'user-read-email'],
    redirectUri = 'https://example.com/callback',
    clientId = '6c792eb4871e4c61832806d8e31aa947',
    state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
    redirectUri : redirectUri,
    clientId : clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);