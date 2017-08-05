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

//const imageHandler = require('image-handler');
const returnImage = require('./image-holder').returnImage;
const processImage = require('./image-processor');

app.use(bodyParser());
app.post('/processImage', processImage);
app.get('/getImage', returnImage);

http.createServer(app).listen(1337, function(){
    console.log('Express server listening on port 1337');
});