/**
 * Sets the image and calls the Emotion API to determine the emotion depicted in the image.
 * Created by Sudhir Mandarapu on 5/8/17.
 * Last modified on 5/8/17.
 */

const oxfordEmotion = require("node-oxford-emotion")("6ca9f844861d4ae4b6cdb372db4e8fb7");
const serverImageGetterUrl = "https://0ddef284.ngrok.io/getImage";
var img;
var initializeSpotifyModule = require('../spotify-practice-alternate/app').initializeSpotifyModule;

function processImage(req, res){
    console.log(req);
    res.end();
    img = req.body.img;
    console.log(initializeSpotifyModule);
    //return;
    oxfordEmotion.recognize("url", serverImageGetterUrl, initializeSpotifyModule);
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