/**
 * Saves the image and returns it when a GET request is made for the image.
 * Created by Sudhir Mandarapu on 5/8/17.
 * Last modified on 5/8/17.
 */

var img;

function returnImage(req, res){
    console.log("request made");

    var bufferImg = new Buffer(img, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': bufferImg.length
    });
    res.end(bufferImg);
}

function setImage(image){
    img = image;
}

module.exports = {"setImage" : setImage, "returnImage": returnImage};