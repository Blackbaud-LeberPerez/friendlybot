var Bot    = require('ttapi');
var AUTH   = 'fPLcVsKRFxCuXDUJgdtQXnbT';
var USERID = '523cbc4caaa5cd604208c221';
var ROOMID = '5239ba6eaaa5cd1c65cd5115';

var bot = new Bot(AUTH, USERID, ROOMID);

bot.debug = true;

var addSongKeyphrase = "Hey bot, play ";
var djKeyword = "Get on stage, bot";
var stopDjKeyword = "Get off, bot";

bot.on('speak', function (data) {
  // Get the data
  var name = data.name;
  var text = data.text;

  if(name.match(/leber/))
    adminOnlyCommands(text);


  if (text.match(/(swallow|hard|like it|head)/gi) != null){
      bot.speak("That's what she said!");
  } else if (name.match(/DJ Luminate/)){
      bot.speak('Who are you, DJ Luminate?');
  } else if (text.match(/^\/hello$/i)) {
      bot.speak('Hey! How are you @'+name+'?');
  } else if (text.match(/^\/top$/)){
      bot.speak("Top User Points in Room");
      bot.roomInfo(function(msg){
        var userArray = msg.users;
        userArray.sort(function(a, b) {return b.points - a.points});
        //botSpeakRecursive(0, userArray);
        for(var i = 0; i < Math.min(userArray.length, 5); i++){
          bot.speak(userArray[i].name+": "+userArray[i].points);
          sleep(100);
        }
      })
  }
});

var adminOnlyCommands = function (text){
  if(text.match(addSongKeyphrase)){    
    var searchTerm = text.substring(addSongKeyphrase);
    bot.searchSong(searchTerm, function(data){
      var songId = data.docs[0]._id;
      bot.playlistAdd(songId);
    });
  }

  if(text.match(djKeyword)){
    bot.addDj();
  }

  if(text.match(stopDjKeyword)){
    bot.remDj();
  }
}

bot.on('escort', function(data){
  bot.speak("Suck it " + data.user[0].name);
});

bot.on('add_dj', function (data) {
  bot.speak("Go " + data.user[0].name + "! Show them how to spin!");   
});


var botSpeakRecursive = function(index, userArray) {
  if(index < Math.min(userArray.length, 5)){
    bot.speak(userArray[index].name+": "+userArray[index].points, botSpeakRecursive(index+1, userArray));
    sleep(250);
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


bot.on('newsong', function(data){
  var songName = data.room.metadata.current_song.metadata.song;
  var artist = data.room.metadata.current_song.metadata.artist;


  bot.vote('up');
});
