var cognitiveServices = require('cognitive-services');

const emotion = cognitiveServices.emotion({
    API_KEY: '6ebbbb420d8b465ca74d191cc2747c98'
});


emotion.emotionRecognition({"http://img.usmagazine.com/article-leads-vertical-300/1251227849_kanye_west_290x402.jpg"});

/*
emotion.emotionRecognition({
    parameters: [{url : "http://img.usmagazine.com/article-leads-vertical-300/1251227849_kanye_west_290x402.jpg"}]
}, function(response){
    console.log(response);
});
*/