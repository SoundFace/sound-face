/**
 * This program handles inbound and outbound texts to and from the company Twilio number.
 *
 * Created by Sudhir Mandarapu on 28/6/17.
 * Last modified on 17/7/17.
 */

// Node.js
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//const imageHandler = require('image-handler');

app.use(bodyParser());
app.post('/imageUpload', imageHandler);

http.createServer(app).listen(1337, function(){
    console.log('Express server listening on port 1337');
});

function imageHandler(request, response){
    response.end();
    console.log(request);

}