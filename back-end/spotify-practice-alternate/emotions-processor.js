
function getSongsForEmotion(emotion, details){
    var playlistSongs = [];
    for(var songId in details){
        var songEmotion = classifySong(details[songId]);
        if (emotion === songEmotion){
            playlistSongs.push(details[songId]);
            if(playlistSongs.length >= 20){
                return;
            }
        }
    }
}

function classifySong(songObject){
    for(var attribute in songObject){
        
    }
}
