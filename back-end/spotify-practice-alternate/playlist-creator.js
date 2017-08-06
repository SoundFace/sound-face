var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');

var client_id = 'b6b386ae95844943861b17686056e06e'; // Your client id
var client_secret = '7046e4136072454282510b1d0aa18307'; // Your secret
var redirect_uri = 'http://localhost:1337/callback'; // Your redirect uri

var spotifyApi = new SpotifyWebApi({
    clientId : client_id,
    clientSecret : client_secret,
    redirectUri : redirect_uri
});

spotifyApi.setAccessToken('BQAKBFfTUiFNMU_I67kWgDuuF7v7MG9d49KbDwbP_6NIEnC4b3bFL3Uv9pWFMTMK8wTW3nKp9nlM2PlR0Wo5_CHt_keNO7ZRvBVn21fdy5tpx8xl33Thq00Z0IAXisvKDIP1Y65ne937_Wg2AdBFlSpdRWYW0F0j6LMSM7xNYT5-sZAdK-O3CGWWcjkB0k1SuHXlDZP32fUT8GegOrKIOV89Py1UUOI4bxL-C3U_W_E1zEFyXivywpZjNTL_U5BjUjOv7sjHQkYMoW5Gpb8YePQ&refresh_token=AQBNvdwm10bPmtYpsgeBazmI-84xavBtjG-vB5yzzjvoBpOEB3tSCQSrFhulJw0UfA16XwvnjF_MYbZy1pyOvZvskxtCkUlgHoRL4MeqqqMrPsFzojhRNa8qL73dOgmTSEk');

var userEmotion;
var userSongs;
var userId;
var userPlaylist;

function songsHandler(emotion, songs){
    userEmotion = emotion;
    userSongs = songs;
    spotifyApi.getMe()
        .then(userDetailsHandlers, function(err) {
            console.log('songsHandler Something went wrong!', err);
        });
}


function userDetailsHandlers(data){
    userId = data.body.id;
    spotifyApi.createPlaylist(userId, 'Sound Face Playlist: '+userEmotion, { 'public' : false })
        .then(playlistHandler, function(err) {
            console.log('userDetailsHandler Something went wrong!', err);
        });
}

function playlistHandler(data){
    var songs = [];
    for(var i = 0; i < userSongs.length; i++){
        songs.push("spotify:track:"+userSongs[i].id);
    }
    //console.log(songs);
    userPlaylist = data.body.id;

    spotifyApi.addTracksToPlaylist(userId, userPlaylist, songs)
        .then(function(data) {
            console.log('Added tracks to playlist!');
        }, function(err) {
            console.log(err);
        });
}

function returnList(req, res){
    if(userSongs === undefined){
        res.end();
    } else {
        //console.log(userSongs);
        res.writeHead(200);
        res.end(JSON.stringify(userSongs));
    }
}


module.exports = {"songHandler" : songsHandler, "returnList": returnList};