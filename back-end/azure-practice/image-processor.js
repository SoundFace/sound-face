/**
 * Sets the image and calls the Emotion API to determine the emotion depicted in the image.
 * Created by Sudhir Mandarapu on 5/8/17.
 * Last modified on 5/8/17.
 */

const oxfordEmotion = require("node-oxford-emotion")("6ca9f844861d4ae4b6cdb372db4e8fb7");
const setImage = require('./image-holder').setImage;
const serverImageGetterUrl = "https://36666ac9.ngrok.io/getImage";

function processImage(req, res){
    res.end();

    console.log(req);
    return;

    var image = req.body.image;

    setImage(image);
    oxfordEmotion.recognize("url", serverImageGetterUrl, function(cb) {
        console.log(cb);
        // Process the image.
    });
}

module.exports = processImage;