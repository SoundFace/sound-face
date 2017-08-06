/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = 'b6b386ae95844943861b17686056e06e'; // Your client id
var client_secret = '7046e4136072454282510b1d0aa18307'; // Your secret
var redirect_uri = 'http://localhost:1337/callback'; // Your redirect uri

var ACCESS_TOKEN;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

var app = express();
var userEmotion;
var songDetails;
var genre = [];
var songIds;

app.use(express.static(__dirname + '/public'))
    .use(cookieParser());

function initializeSpotifyModule(data){
    var emotions = data[0].scores;
    var mostProminentEmotion;
    var maxValue = -1;
    for(var emotion in emotions){
        if(emotions[emotion] > maxValue){
            maxValue = emotions[emotion];
            mostProminentEmotion = emotion;
        }
    }

    genre = [];
    userEmotion = mostProminentEmotion;
    if (userEmotion === "angry"){
        genre = ["rap", "metal"];
    }
    else if(userEmotion === "neutral"){
        genre[0] = "chill";
        genre[1] = "country";
    }
    else if(userEmotion === "happiness"){
        genre[0] = "party";
        genre[1] = "popculture";
    }
    else if(userEmotion === "sadness"){
        genre[0] = "rnb";
        genre[1] = "blues";
    }
    else if(userEmotion === "fear"){
        genre[0] = "metal";
        genre[1] = "metal";
    }

    else if(userEmotion === "surprise"){
        genre[0] ="metal";
        genre[1] ="edm_dance";
    }
    getPlaylists();
}

app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    //var scope = 'playlist-read-private playlist-modify-private playlist-modify-public user-library-read user-library-modify user-top-read user-follow-read';
    var scope  = 'user-read-private user-read-email playlist-read-private user-top-read'
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    console.log(body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get('/refresh_token', function(req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});


var spotifyApi = new SpotifyWebApi({
    clientId : client_id,
    clientSecret : client_secret,
    redirectUri : redirect_uri
});

spotifyApi.setAccessToken('BQB69ghviACmf4MfOJ5eegpoAmYp5JYydfuJQMcdiC8lasj_UQGa8N_ilvdAH3mJkYaZl7Jm1joxXQa4M4m2wnBmBbH6syoggTb1NmD7HUyCWQAUC_Pr_BkSIXZNNyzJ5Qm1w40JvA7fO0chhUKhkvTZoGI5PlhPArQU6xkQEBVvVVQA7Eer0amZB5oOSRpd9_gSrqT-3k9mcqlqPOE3sAukbvAgbFyAKPAARyCnnLWjV1b3FnlZ8D3Goc79IC1ASEyvQA1Q-Y5NfmAye73e9gk&refresh_token=AQCGEq5c1RMGd3xBcpwz6SRTgJZx8jF1OCHtZMAAdS7c4zobgpYu-Tw8h1UmNN2VzVQBIBeX1MFTHBFD68XEciO6zNr3oo56uiagBLOKyfG9j8iQqJBHrdspwc3YQabLueY');


var totalPlaylists = 2;

function getPlaylists(){
    for(var i = 0; i < 2; i++){
        var randomNumberBetween0and20 = Math.floor(Math.random() * 21);
        spotifyApi.getPlaylistsForCategory(genre[i], {
            country: 'BR',
            limit : 2,
            offset : randomNumberBetween0and20
        })
            .then(getSongsOfPlaylists, function(err) {
                console.log("Something went wrong!", err);
            });
    }
}




function getSongsOfPlaylists(data){
    var songs = data.body.tracks.items;
    for(var i = 0; i < songs.length; i++){
        songDetails[songs[i].track.id] = {};
        songDetails[songs[i].track.id].name = songs[i].track.name;
        songIds.push(songs[i].track.id);
    }
    finishGettingPlaylistSongs();
}

var playlistsComplete = 0;

function finishGettingPlaylistSongs(){
    playlistsComplete++;
    if(playlistsComplete >= totalPlaylists){
        sendAudioFeatureRequests();
        spotifyApi.getAudioFeaturesForTracks(songIds, handleAudioFeatures);
    }
}


var batches = 0;
function sendAudioFeatureRequests(){
    var i = 0;
    var ids = [];
    batches = Math.ceil(songIds.length/5);
    while(i < songIds.length){
        ids.push(songIds[i]);
        if(i%5 === 0 && i !== 0){
            spotifyApi.getAudioFeaturesForTracks(ids, handleAudioFeatures);
            ids = [];
        }
        i++;
    }
    if(ids.length !== 0){
        spotifyApi.getAudioFeaturesForTracks(ids, handleAudioFeatures);
    }
}

function handleAudioFeatures(err, res){
    if(err){
        console.log("API returned an error: "+err);
        return;
    }
    var audioFeatures = res.body.audio_features;
    for(var i = 0; i < audioFeatures.length; i++){
        var id = audioFeatures[i].id;
        songDetails[id].danceability = audioFeatures[i].danceability;
        songDetails[id].energy = audioFeatures[i].energy;
        songDetails[id].loudness = audioFeatures[i].loudness;
        songDetails[id].valence = audioFeatures[i].valence;
        songDetails[id].speechiness = audioFeatures[i].speechiness;
        songDetails[id].acousticness = audioFeatures[i].acousticness;
        songDetails[id].instrumentalness = audioFeatures[i].instrumentalness;
        songDetails[id].liveness = audioFeatures[i].liveness;
        songDetails[id].tempo = audioFeatures[i].tempo;
        songDetails[id].track_href = audioFeatures[i].track_href;
        songDetails[id].id = id;
    }
    finishAudioFeaturesRequest();
}


var batchesComplete = 0;
function finishAudioFeaturesRequest(){
    batchesComplete++;
    if(batchesComplete >= batches){
        const getSongsForEmotions = require('./emotions-processor');
        getSongsForEmotions(userEmotion, songDetails);
    }
}

/*
console.log('Listening on 1337');
app.listen(1337);
*/

module.exports = {"initializeSpotifyModule":initializeSpotifyModule};