/**
 * Sets the image and calls the Emotion API to determine the emotion depicted in the image.
 * Created by Sudhir Mandarapu on 5/8/17.
 * Last modified on 5/8/17.
 */

const oxfordEmotion = require("node-oxford-emotion")("6ca9f844861d4ae4b6cdb372db4e8fb7");
const serverImageGetterUrl = "https://3697d57a.ngrok.io/getImage";
var img;
var lastRequestTime;

function processImage(req, res){
    if(lastRequestTime === undefined){
        lastRequestTime = new Date();
        res.end();
        img = req.body.img;
        //return;
        var initializeSpotifyModule = require('../spotify-practice-alternate/app').initializeSpotifyModule;
        oxfordEmotion.recognize("url", serverImageGetterUrl, initializeSpotifyModule);
    } else {
        var now = new Date();
        if(now - lastRequestTime > 20000){
            res.end();
            img = req.body.img;
            //return;
            var initializeSpotifyModule = require('../spotify-practice-alternate/app').initializeSpotifyModule;
            oxfordEmotion.recognize("url", serverImageGetterUrl, initializeSpotifyModule);
        }
        console.log("too early");
    }

}

function returnImage(req, res){
    console.log("request made");

    var bufferImg = new Buffer(img, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': bufferImg.length
    });
    res.end(bufferImg);

}

module.exports = {"processImage" : processImage, "returnImage" : returnImage};