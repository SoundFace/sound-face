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

spotifyApi.setAccessToken('BQDKXZUYps-QGWAvYQR7wgLNklkVyGL-l5YGpQWyJG2Jeq26Wo927Nf0qNydcSPRdlt5jK3PrEgF-wZeFd22muKEZqUew64-FWxy4Fe7uI7uFXAXzME740aTQkR_ZpfjGJT9wngkZ6mW3xXYGeY0Gc2Rf6Qq1ZAu_UO-HdSzMCeHcTrpRFOcgBMkbEyzaecSFfC87RYrUyMAHUyzyQZVgem5FpxnYgFMGAUSOaRNR7KjMQg4Tph0jX1bU_t7vf-L2P8HDcauJ2peAzacGBc6-6Y&refresh_token=AQD7qe9kvyH_QI7HxvtqwuY6rKO5kD29TmhCdo8RpnrJR22IdQvtwsdb3WExrNNF5kuE6KJJAvP7djaJo8gp2bDSJVn0cJzdiSO8UFxTnaL5YTmGqOfc-QnENjVb9bk_sS8');

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