/**
 * Contains all server listeners.
 * Created by Sudhir Mandarapu on 5/8/17.
 * Last modified on 5/8/17.
 */

// Node.js
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const processRequest = require('./spotify-main');

app.use(bodyParser());
app.post('/authenticationCallback', processRequest);
app.get('/authenticate', function(req, res){
    res.writeHead(200);
    res.end();
    console.log(req);
});
http.createServer(app).listen(1337, function(){
    console.log('Express server listening on port 1337');
});