var Bot    = require('ttapi');
var AUTH   = 'fPLcVsKRFxCuXDUJgdtQXnbT';
var USERID = '523cbc4caaa5cd604208c221';
var ROOMID = '5239ba6eaaa5cd1c65cd5115';

var bot = new Bot(AUTH, USERID, ROOMID);


bot.on('speak', function (data) {
  // Get the data
  var name = data.name;
  var text = data.text;

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
        botSpeakRecursive(0, userArray);
      })
  }
});

var botSpeakRecursive = function(index, userArray) {
  if(index < Math.min(userArray.length, 5)){
    bot.speak(userArray[index].name+": "+userArray[index].points, botSpeakRecursive(index+1, userArray));
  }
}


bot.on('newsong', function(data){
  var songName = data.room.metadata.current_song.metadata.song;
  var artist = data.room.metadata.current_song.metadata.artist;


  bot.vote('up');
});
