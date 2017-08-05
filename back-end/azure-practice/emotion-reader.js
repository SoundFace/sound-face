const oxfordEmotion = require("node-oxford-emotion")("6ca9f844861d4ae4b6cdb372db4e8fb7");

getEmotionData()

function getEmotionData(imageUrl, callback){
    oxfordEmotion.recognize("url",imageUrl, function(cb) {
        console.log(cb);
    });
}
