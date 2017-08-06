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

var client_id = '86a86fa216b44890809b32acdfd44b05'; // Your client id
var client_secret = '2b0dd2c8b4af431d8b58e4629eeda5a6'; // Your secret
var redirect_uri = 'https://2203bb20.ngrok.io/authorize'; // Your redirect uri
var stateKey = 'spotify_auth_state';

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


var app = express();

app.use(express.static(__dirname + '/public')).use(cookieParser());

app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    //var scope = 'playlist-read-private playlist-modify-private playlist-modify-public user-library-read user-library-modify user-top-read user-follow-read';
    var scope  = 'user-read-private user-read-email playlist-read-private user-top-read';
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

spotifyApi.getNewReleases({ limit : 5, offset: 0, country: 'SE' })
    .then(function(data) {
        console.log(data.body);
        done();
    }, function(err) {
        console.log("Something went wrong!", err);
    });

console.log('Listening on 1337');
app.listen(1337);